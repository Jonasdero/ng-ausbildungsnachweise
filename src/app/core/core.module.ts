import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared';
import { ComponentsModule } from '../components/components.module';

import { FooterComponent } from './footer/footer.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '../../../node_modules/@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    FooterComponent,
    NotificationListComponent,
    NavbarComponent
  ],
  exports: [
    FooterComponent,
    NotificationListComponent,
    NavbarComponent
  ]
})
export class CoreModule { }
