import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestPageComponent } from './test-page.component';
import { TestPageRoutingModule } from './test-page-routing.module';
import { PanelModule, TransactionListItemModule } from 'src/app/components';
import { TransactionsHistoryComponent } from './transactions-history';
import { TransferFormComponent } from './transfer-form';
import { NameToImageModule } from 'src/app/pipes';


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
  ],
})
export class TestPageModule {}
