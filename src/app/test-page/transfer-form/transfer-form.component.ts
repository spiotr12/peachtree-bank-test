import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FromAppState } from 'src/app/+state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { accountOverdraftLimitAsyncValidator } from 'src/app/validators';


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
    fromAccount: new FormControl(null, { validators: [Validators.required] }),
    toAccount: new FormControl(null, { validators: [Validators.required] }),
    amount: new FormControl(null, { validators: [Validators.required, Validators.min(0)] }),
  });

  @HostBinding('class.pbt-transfer-form')
  private readonly mainCSSClass = true;

  constructor(private store: Store) {
    this.balance$ = this.store.select(FromAppState.getBalance);
    this.form.controls.amount.setAsyncValidators(accountOverdraftLimitAsyncValidator(this.balance$, -500));
  }

  public submit(): void {
    if (this.form.valid) {
      console.log('form valid');
    } else {
      console.error('form invalid');
    }
  }
}
