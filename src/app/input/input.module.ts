import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputWordComponent } from './input-word/input-word.component';
import { InputWeekComponent } from './input-week/input-week.component';

const routes: Routes = [
  { path: '', component: InputWordComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [InputWeekComponent, InputWordComponent],
})
export class InputModule { }
