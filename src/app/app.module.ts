import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatDialog,
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule,
  MatFormFieldModule, MatInputModule, MatListModule, MatSidenavModule,
  MatToolbarModule, MatGridListModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { InputWordComponent } from './input-word/input-word.component';
import { InputWeekComponent } from './input-week/input-week.component';

@NgModule({
  declarations: [
    AppComponent,
    NavButtonComponent,
    InputWordComponent,
    InputWeekComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,

    // Angular Material
    LayoutModule,
    MatButtonModule, MatCardModule, MatDialogModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatListModule, MatSidenavModule,
    MatToolbarModule, MatGridListModule
  ],
  providers: [MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
