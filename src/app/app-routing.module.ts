import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpComponent } from './pages/help/help.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RandomFillComponent } from './pages/random-fill/random-fill.component';

import { AuthGuard } from './shared';

const routes: Routes = [
  { path: '', loadChildren: './input/input.module#InputModule', pathMatch: 'full' },
  { path: 'importexport', loadChildren: './import/import.module#ImportModule', pathMatch: 'full' },
  { path: 'help', component: HelpComponent },
  { path: 'random-fill', component: RandomFillComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }