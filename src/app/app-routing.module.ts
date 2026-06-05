import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { authGuard, settingsGuard } from './shared';

import { HelpComponent } from './pages/help/help.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RandomFillComponent } from './pages/random-fill/random-fill.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { TableViewComponent } from './pages/table-view/table-view.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./input/input.module').then(m => m.InputModule), canActivate: [settingsGuard], pathMatch: 'full' },
  { path: 'importexport', loadChildren: () => import('./import/import.module').then(m => m.ImportModule), canActivate: [settingsGuard], pathMatch: 'full' },
  { path: 'help', component: HelpComponent, canActivate: [settingsGuard] },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'random-fill', component: RandomFillComponent, canActivate: [settingsGuard] },
  { path: 'table-view', component: TableViewComponent, canActivate: [settingsGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [settingsGuard, authGuard] },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
