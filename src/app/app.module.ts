import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

// Angular Material
import {
  MatDialog,
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatSelectModule,
  MatFormFieldModule, MatInputModule, MatListModule, MatSidenavModule,
  MatToolbarModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS
} from '@angular/material';

// Classes
import { GermanDateAdapter } from './shared/GermanDateAdapter';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { InputWordComponent } from './input-word/input-word.component';
import { InputWeekComponent } from './input-week/input-week.component';
import { SettingsComponent } from './settings/settings.component';


// Const
const MY_DATE_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

@NgModule({
  declarations: [
    AppComponent,
    InputWordComponent, InputWeekComponent,
    SettingsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),

    // Angular Material
    LayoutModule,
    MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatSelectModule,
    MatFormFieldModule, MatInputModule, MatListModule, MatSidenavModule,
    MatToolbarModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule,
  ],
  providers: [
    MatDialog,
    { provide: DateAdapter, useClass: GermanDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
