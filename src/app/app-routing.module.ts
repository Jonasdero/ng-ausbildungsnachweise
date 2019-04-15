import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared';

import { HelpComponent } from './pages/help/help.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RandomFillComponent } from './pages/random-fill/random-fill.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SettingsGuard } from './shared/guards/settings.guard';
import { TableViewComponent } from './pages/table-view/table-view.component';

const routes: Routes = [
  { path: '', loadChildren: './input/input.module#InputModule', canActivate: [SettingsGuard], pathMatch: 'full' },
  { path: 'importexport', loadChildren: './import/import.module#ImportModule', canActivate: [SettingsGuard], pathMatch: 'full' },
  { path: 'help', component: HelpComponent, canActivate: [SettingsGuard] },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'random-fill', component: RandomFillComponent, canActivate: [SettingsGuard] },
  { path: 'table-view', component: TableViewComponent, canActivate: [SettingsGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [SettingsGuard, AuthGuard] },
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  { path: '**', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }