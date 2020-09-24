import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameToImagePipe } from './name-to-image.pipe';


@NgModule({
  declarations: [NameToImagePipe],
  imports: [
    CommonModule,
  ],
  exports: [NameToImagePipe],
})
export class NameToImageModule {}
