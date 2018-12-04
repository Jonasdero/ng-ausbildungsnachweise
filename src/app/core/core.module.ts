import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { MaterialModule } from '../shared';
import { ComponentsModule } from '../components/components.module';

import { FooterComponent } from './footer/footer.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    RouterModule,
    MDBBootstrapModule,
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
