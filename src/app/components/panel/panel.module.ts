import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';



@NgModule({
  declarations: [PanelComponent],
  exports: [
    PanelComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class PanelModule { }
