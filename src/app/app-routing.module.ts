import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputWordComponent } from './input-word/input-word.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: InputWordComponent },
  { path: 'settings', component: SettingsComponent },
  // Example of Lazy Loading a module
  // {
  //     path: 'login',
  //     loadChildren: './login/login.module#LoginModule',
  // },
  { path: '**', redirectTo: '', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }