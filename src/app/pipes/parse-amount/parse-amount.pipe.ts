import { Pipe, PipeTransform } from '@angular/core';
import { ITransaction } from 'src/app/models';


@Pipe({
  name: 'parseAmount',
})
export class ParseAmountPipe implements PipeTransform {

  transform(value: ITransaction): number {
    const mod = value.creditDebitIndicator === 'DBIT' ? -1 : 1;
    return value.amountCurrency.amount * mod;
  }

}
