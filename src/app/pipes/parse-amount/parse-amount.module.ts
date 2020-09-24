import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParseAmountPipe } from './parse-amount.pipe';


@NgModule({
  declarations: [ParseAmountPipe],
  imports: [
    CommonModule,
  ],
  exports: [ParseAmountPipe],
})
export class ParseAmountModule {}
