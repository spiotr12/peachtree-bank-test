import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page.component';
import { TestPageRoutingModule } from './test-page-routing.module';
import { PanelModule } from 'src/app/components';
import { TransactionsHistoryComponent } from './transactions-history';
import { TransferFormComponent } from './transfer-form';


@NgModule({
  declarations: [
    TestPageComponent,
    TransactionsHistoryComponent,
    TransferFormComponent,
  ],
  imports: [
    CommonModule,
    TestPageRoutingModule,
    PanelModule,
  ],
})
export class TestPageModule {}
