import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared';

import { HelpComponent } from './pages/help/help.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RandomFillComponent } from './pages/random-fill/random-fill.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SettingsGuard } from './shared/settings.guard';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  { path: '', loadChildren: './input/input.module#InputModule', canActivate: [SettingsGuard], pathMatch: 'full' },
  { path: 'importexport', loadChildren: './import/import.module#ImportModule', canActivate: [SettingsGuard], pathMatch: 'full' },
  { path: 'help', component: HelpComponent, canActivate: [SettingsGuard] },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'random-fill', component: RandomFillComponent, canActivate: [SettingsGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [SettingsGuard, AuthGuard] },
  { path: '**', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }