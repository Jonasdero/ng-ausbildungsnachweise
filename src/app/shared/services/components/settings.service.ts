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
    ausbildungsStart: "04.09.2016",
    ausbildungsStartDate: new Date(1472940000000),
    beruf: "Fachinformatiker Anwendungsentwicklung",
    spe: "Siemens Professional Education Paderborn",
    atiw: "Atiw Paderborn",
    praxis: "Atos, AIS GER HR PD Azubi"
  }
  testSettings = {
    vorname: "Jonas",
    nachname: "Roser",
    ausbildungsStart: "04.09.2016",
    ausbildungsStartDate: new Date(1472940000000),
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