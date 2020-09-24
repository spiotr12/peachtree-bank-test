import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page.component';
import { TestPageRoutingModule } from './test-page-routing.module';
import { PanelModule, TransactionListItemModule } from 'src/app/components';
import { TransactionsHistoryComponent } from './transactions-history';
import { TransferFormComponent } from './transfer-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
  ],
})
export class TestPageModule {}
