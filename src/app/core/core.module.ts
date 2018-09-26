import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared';

import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [FooterComponent],
  exports: [FooterComponent]
})
export class CoreModule { }
