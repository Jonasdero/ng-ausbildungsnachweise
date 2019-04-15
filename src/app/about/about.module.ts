import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { DsgvoComponent } from './dsgvo/dsgvo.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

const routes: Routes = [
  { path: 'impressum', component: ImpressumComponent },
  { path: 'dsgvo', component: DsgvoComponent },
  { path: 'terms', component: TermsOfServiceComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule,
  ],
  declarations: [
    DsgvoComponent,
    ImpressumComponent,
    TermsOfServiceComponent,
    DisclaimerComponent,
  ]
})
export class AboutModule { }
