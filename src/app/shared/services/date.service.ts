import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private settingsService: SettingsService) { }

  getMonday(d): Date {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  getFriday(d: Date): Date {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -2 : 5);
    return new Date(d.setDate(diff));
  }

  getNextWeekDate(d: Date): Date {
    return new Date(d.getTime() + 7 * 24 * 60 * 60 * 1000);
  }

  getAusbildungsNachweisNr(d: Date): number {
    return Math.ceil(Math.abs(d.getTime() - new Date(this.settingsService.settings.ausbildungsStart).getTime()) / (1000 * 3600 * 24 * 7));
  }

  getAusbildungsJahr(d: Date): number {
    return Math.ceil(Math.abs(d.getTime() - new Date(this.settingsService.settings.ausbildungsStart).getTime()) / (1000 * 3600 * 24 * 365));
  }

  getLocaleDateString(d: Date): string {
    return d.toLocaleDateString('de', { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  germanLocalToDate(dateString: string): Date {
    var parts = dateString.split('.');
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  }
}
