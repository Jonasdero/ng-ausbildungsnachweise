import { Injectable, Output, EventEmitter, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'ng-ausbildungsnachweise-settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  @Output() updatedSettings = new EventEmitter<Settings>();
  private settings: Settings;
  hasSettings = false;
  demoSettings = {
    vorname: '',
    nachname: '',
    ausbildungsStart: '04.09.2016',
    ausbildungsStartDate: new Date(1472940000000),
    beruf: 'Fachinformatiker Anwendungsentwicklung',
    spe: 'Siemens Professional Education Paderborn',
    atiw: 'Atiw Paderborn',
    praxis: 'Atos, AIS GER HR PD Azubi'
  };
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  getSettings(): Observable<Settings> {
    // If settings are already saved then return them
    if (this.settings) { return of(this.settings); }
    // Else get settings from session storage
    const settings = this.storage.get(STORAGE_KEY);
    if (settings !== null && settings !== undefined) { this.settings = settings; }
    // If no settings are retrieved set demoSettings to settings
    else { this.settings = this.demoSettings; }
    this.updatedSettings.emit(this.settings);
    // return
    return of(this.settings);
  }
  saveSettings(settings: Settings): void {
    this.storage.set(STORAGE_KEY, settings);
    this.settings = settings;
    this.updatedSettings.emit(settings);
  }
}