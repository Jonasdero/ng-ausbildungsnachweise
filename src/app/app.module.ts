import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Localization
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe, 'de');

// Firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ComponentsModule } from './components/components.module';
import { MaterialModule } from './shared/modules/material.module';

// Components
import { AppComponent } from './app.component';

import { SettingsComponent } from './settings/settings.component';
import { HelpComponent } from './help/help.component';



@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    HelpComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),

    // Angular Material
    LayoutModule,
    MaterialModule,

    CoreModule,
    ComponentsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "de" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
