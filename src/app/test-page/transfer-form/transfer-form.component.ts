import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FromAppState } from 'src/app/+state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { accountOverdraftLimitAsyncValidator } from 'src/app/validators';
import { TransactionService } from 'src/app/services/transaction';
import { ITransactionRecord } from 'src/app/models';


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
    fromAccount: new FormControl('Free Checking', { validators: [Validators.required] }),
    toAccount: new FormControl(null, { validators: [Validators.required] }),
    amount: new FormControl(null, { validators: [Validators.required, Validators.min(0)] }),
  });

  @HostBinding('class.pbt-transfer-form')
  private readonly mainCSSClass = true;

  constructor(private store: Store,
              private transactionService: TransactionService) {
    this.balance$ = this.store.select(FromAppState.getBalance);
    this.form.controls.amount.setAsyncValidators(accountOverdraftLimitAsyncValidator(this.balance$, -500));
  }

  public submit(): void {
    if (this.form.valid) {
      const transaction = this.prepareTransaction(this.form.value);

      // Simulate "preview" process
      const proceed = confirm(JSON.stringify(transaction, null, 4));

      if (!proceed) {
        return;
      }

      this.transactionService.createTransaction(transaction).subscribe(() => {
        this.form.reset();
      });
    } else {
      alert('form invalid');
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
