import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestPageComponent } from './test-page.component';
import { TestPageRoutingModule } from './test-page-routing.module';
import { PanelModule, TransactionListItemModule } from 'src/app/components';
import { TransactionsHistoryComponent } from './transactions-history';
import { TransferFormComponent } from './transfer-form';
import { NameToImageModule, ParseAmountModule } from 'src/app/pipes';
import { SortIndicatorModule } from 'src/app/components/sort-indicator';


@NgModule({
  declarations: [
    TestPageComponent,
    TransactionsHistoryComponent,
    TransferFormComponent,
  ],
    imports: [
        CommonModule,
        TestPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PanelModule,
        TransactionListItemModule,
        NameToImageModule,
        SortIndicatorModule,
        ParseAmountModule,
    ],
})
export class TestPageModule {}
