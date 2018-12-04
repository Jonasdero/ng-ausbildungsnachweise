import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// Localization
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe, 'de');

// Firebase
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth';;
import { environment } from '../environments/environment';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ComponentsModule } from './components/components.module';
import { MaterialModule } from './shared/modules/material.module';

// Components
import { AppComponent } from './app.component';
import { HelpComponent } from './pages/help/help.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RandomFillComponent } from './pages/random-fill/random-fill.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LandingComponent } from './pages/landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,

    HelpComponent,
    SettingsComponent,
    RandomFillComponent,
    WelcomeComponent,
    LandingComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,

    // Angular Material
    LayoutModule,
    MaterialModule,

    CoreModule,
    ComponentsModule,

  ],
  providers: [{ provide: LOCALE_ID, useValue: "de" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
