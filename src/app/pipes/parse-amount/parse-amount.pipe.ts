import { Pipe, PipeTransform } from '@angular/core';
import { ITransaction } from 'src/app/models';


@Pipe({
  name: 'parseAmount',
})
export class ParseAmountPipe implements PipeTransform {

  transform(value: ITransaction, ...args: unknown[]): number {
    const mod = value.creditDebitIndicator === 'DBIT' ? -1 : 1;
    return value.amountCurrency.amount * mod;
  }

}
