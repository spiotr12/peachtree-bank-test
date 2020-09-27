import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppActions, FromAppState } from 'src/app/+state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { accountOverdraftLimitAsyncValidator } from 'src/app/validators';
import { TransactionService } from 'src/app/services/transaction';
import { ITransactionRecord } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog';
import { switchMap } from 'rxjs/operators';


const hardcodedFromAccount = 'Free Checking';

/**
 * Component that handles transfer form
 */
@Component({
  selector: 'pbt-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferFormComponent {

  /**
   * Current balance stream
   */
  public readonly balance$: Observable<number>;

  public readonly form: FormGroup = new FormGroup({
    fromAccount: new FormControl(hardcodedFromAccount, { validators: [Validators.required] }),
    toAccount: new FormControl(null, { validators: [Validators.required] }),
    amount: new FormControl(null, { validators: [Validators.required, Validators.min(0)] }),
  });

  @HostBinding('class.pbt-transfer-form')
  private readonly mainCSSClass = true;

  constructor(private store: Store,
              private transactionService: TransactionService,
              private dialog: MatDialog) {
    this.balance$ = this.store.select(FromAppState.getBalance);
    this.form.controls.amount.setAsyncValidators(accountOverdraftLimitAsyncValidator(this.balance$, -500));
  }

  public submit(): void {
    if (this.form.valid) {
      const transaction = this.prepareTransaction(this.form.value);

      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data: transaction,
      });

      confirmDialog.afterClosed().pipe(
        switchMap((result: boolean) => result
          ? this.transactionService.createTransaction(transaction).pipe(
            // Load transaction (simulate load state from backend)
            switchMap(() => this.transactionService.getTransactions()),
          )
          : of(null),
        ),
      ).subscribe((transactions) => {
        if (transactions) {
          this.form.reset({ fromAccount: hardcodedFromAccount });
          // This action is dispatched twice as the transaction service simulates the backed and updates the store as well
          // However this would be the actual store update on frontend.
          this.store.dispatch(AppActions.loadTransactions({ transactions }));
        }
      });
    } else {
      alert('Form invalid');
    }
  }

  private prepareTransaction(data: { fromAccount: string, toAccount: string, amount: number }): ITransactionRecord {
    return {
      dates: {
        valueDate: new Date(),
      },
      transaction: {
        type: data.fromAccount,
        creditDebitIndicator: 'DBIT',
        amountCurrency: {
          amount: data.amount,
          currencyCode: 'EUR',
        },
      },
      merchant: {
        name: data.toAccount,
        accountNumber: '0000 0000 0000 0000',
      },
      categoryCode: '#98C379',
    };
  }
}
