import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared';

import { ImportexportComponent } from './importexport/importexport.component';
import { ImportDialogComponent } from './import-dialog/import-dialog.component';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';

const routes: Routes = [
  { path: '', component: ImportexportComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [ImportexportComponent, ImportDialogComponent],
  entryComponents: [ImportDialogComponent],
})
export class ImportModule { }
