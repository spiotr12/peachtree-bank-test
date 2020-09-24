import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortIndicatorComponent } from './sort-indicator.component';



@NgModule({
  declarations: [SortIndicatorComponent],
  exports: [
    SortIndicatorComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class SortIndicatorModule { }
