import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListItemComponent } from './transaction-list-item.component';



@NgModule({
    declarations: [TransactionListItemComponent],
    exports: [
        TransactionListItemComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class TransactionListItemModule { }
