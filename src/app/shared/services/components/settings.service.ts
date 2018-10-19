import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  @Output() updatedSettings = new EventEmitter<Settings>();
  private settings: Settings;
  initialSettingsSet: boolean = false;
  demoSettings = {
    vorname: "",
    nachname: "",
    ausbildungsStart: "2016-09-03T22:00:00.000Z",
    beruf: "Fachinformatiker Anwendungsentwicklung",
    spe: "Siemens Professional Education Paderborn",
    atiw: "Atiw Paderborn",
    praxis: "Atos, AIS GER HR PD Azubi"
  }
  constructor() { }

  getSettings(): Observable<Settings> {
    if (this.settings) return of(this.settings);
    this.settings = this.demoSettings;
    this.updatedSettings.emit(this.settings);
    return of(this.settings);
  }
  saveSettings(settings: Settings): void {
    this.settings = settings;
    this.updatedSettings.emit(settings);
  }
}
