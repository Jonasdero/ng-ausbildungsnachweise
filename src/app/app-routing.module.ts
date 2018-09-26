import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SettingsComponent } from './settings/settings.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  { path: '', loadChildren: './input/input.module#InputModule', },
  { path: 'importexport', loadChildren: './import/import.module#ImportModule', },
  { path: 'settings', component: SettingsComponent },
  { path: 'help', component: HelpComponent },
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