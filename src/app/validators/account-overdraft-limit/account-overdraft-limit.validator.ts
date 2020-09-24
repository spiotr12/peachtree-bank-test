import { Observable } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map, take } from 'rxjs/operators';


export function accountOverdraftLimitAsyncValidator(balance$: Observable<number>, limit: number): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return balance$.pipe(
      take(1),
      map((balance) => {
        if (balance - control.value < limit) {
          const valueOverLimit = +(balance - control.value - limit).toFixed(2);
          return { overdraftLimit: { limit, valueOverLimit } };
        }
        return null;
      }),
    );
  };
}
