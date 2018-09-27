import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SettingsComponent } from './settings/settings.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  { path: '', loadChildren: './input/input.module#InputModule', pathMatch: 'full' },
  { path: 'importexport', loadChildren: './import/import.module#ImportModule', pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
  { path: 'help', component: HelpComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }