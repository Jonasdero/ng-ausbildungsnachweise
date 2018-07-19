import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import {
  MatDialog,
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule,
  MatFormFieldModule, MatInputModule, MatListModule, MatSidenavModule,
  MatToolbarModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule,
  MatSelectModule
} from '@angular/material';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { InputWordComponent } from './input-word/input-word.component';
import { InputWeekComponent } from './input-week/input-week.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    InputWordComponent,
    InputWeekComponent,
    SettingsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase),

    // Angular Material
    LayoutModule,
    MatButtonModule, MatCardModule, MatDialogModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatListModule, MatSidenavModule,
    MatToolbarModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    MatDialog,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
