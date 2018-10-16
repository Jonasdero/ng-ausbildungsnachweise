import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './input/input.module#InputModule', pathMatch: 'full' },
  { path: 'importexport', loadChildren: './import/import.module#ImportModule', pathMatch: 'full' },
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }