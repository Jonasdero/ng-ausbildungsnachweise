import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared';
import { ComponentsModule } from '../components/components.module';

import { FooterComponent } from './footer/footer.component';
import { NotificationListComponent } from './notification-list/notification-list.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule
  ],
  declarations: [
    FooterComponent,
    NotificationListComponent
  ],
  exports: [
    FooterComponent,
    NotificationListComponent
  ]
})
export class CoreModule { }
