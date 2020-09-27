import { Observable, of } from 'rxjs';
import { accountOverdraftLimitAsyncValidator } from './account-overdraft-limit.validator';
import { FormControl, ValidationErrors } from '@angular/forms';


describe('accountOverdraftLimitAsyncValidator', () => {
  it('should pass when value is less then balance', (done) => {
    // Arrange
    const balance = 5000;
    const balance$ = of(balance);
    const limit = -500;
    const validator = accountOverdraftLimitAsyncValidator(balance$, limit);
    const value = 200;
    const control = new FormControl(value);
    // Act
    const validation$ = validator(control);
    // Assert
    expect(validation$).toBeDefined();
    (validation$ as Observable<ValidationErrors | null>).subscribe((result) => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should pass when value is more then balance but more then limit', (done) => {
    // Arrange
    const balance = 5000;
    const balance$ = of(balance);
    const limit = -500;
    const validator = accountOverdraftLimitAsyncValidator(balance$, limit);
    const value = 5400;
    const control = new FormControl(value);
    // Act
    const validation$ = validator(control);
    // Assert
    expect(validation$).toBeDefined();
    (validation$ as Observable<ValidationErrors | null>).subscribe((result) => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should fail when value is more then balance and less then limit', (done) => {
    // Arrange
    const balance = 5000;
    const balance$ = of(balance);
    const limit = -500;
    const validator = accountOverdraftLimitAsyncValidator(balance$, limit);
    const value = 6100;
    const control = new FormControl(value);
    // Act
    const validation$ = validator(control);
    // Assert
    expect(validation$).toBeDefined();
    (validation$ as Observable<ValidationErrors | null>).subscribe((result) => {
      expect(result).not.toBeNull();
      done();
    });
  });
});
