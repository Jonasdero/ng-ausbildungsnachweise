import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  demoSettings = {
    vorname: "",
    nachname: "",
    ausbildungsStart: "2016-09-03T22:00:00.000Z",
    beruf: "Fachinformatiker Anwendungsentwicklung",
    spe: "Siemens Professional Education Paderborn",
    atiw: "Atiw Paderborn",
    praxis: "Atos, AIS GER HR PD Azubi"
  }

  @Output() updatedSettings = new EventEmitter<Settings>();
  settings: Settings;
  constructor() { }

  getSettings(): Observable<Settings> {
    if (this.settings) return of(this.settings);
    this.settings = this.demoSettings;
    return of(this.settings);
  }
  saveSettings(settings: Settings): void {
    this.settings = settings;
    this.updatedSettings.emit(settings);
  }
}
