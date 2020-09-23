import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page.component';
import { TestPageRoutingModule } from './test-page-routing.module';
import { PanelModule } from 'src/app/components';


@NgModule({
  declarations: [
    TestPageComponent,
  ],
  imports: [
    CommonModule,
    TestPageRoutingModule,
    PanelModule,
  ],
})
export class TestPageModule {}
