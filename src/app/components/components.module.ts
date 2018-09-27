import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { MaterialModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    NotificationComponent
  ],
  exports: [
    NotificationComponent
  ]
})
export class ComponentsModule { }
