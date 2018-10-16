import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule, AuthGuard } from '../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HelpComponent } from './help/help.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: HelpComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    SettingsComponent,
    HelpComponent
  ]
})
export class PagesModule { }
