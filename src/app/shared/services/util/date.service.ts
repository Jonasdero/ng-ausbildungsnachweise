import { Injectable } from '@angular/core';
import { SettingsService } from '../components/settings.service';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private settings: Settings;
  constructor(private settingsService: SettingsService) {
    this.settingsService.updatedSettings.subscribe(settings => {
      this.settings = settings;
    })
  }

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

  private getDay(d: Date): number {
    var timeDifference: number = Math.abs(d.getTime() - new Date(this.settings.ausbildungsStart).getTime());
    // A day in milliseconds
    var day = timeDifference / (1000 * 3600 * 24);
    return day;
  }

  getNumber(d: Date): number {
    // Ausbildungstag * 7 + 1 für die richtige Woche
    return Math.ceil(this.getDay(d) * 7) + 1;
  }

  getYear(d: Date): number {
    // Ausbildungstag * 365 aufgerundet
    return Math.ceil(this.getDay(d) * 365);
  }

  getLocaleDateString(d: Date): string {
    return d.toLocaleDateString('de', { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  germanLocalToDate(dateString: string): Date {
    var parts = dateString.split('.');
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  }

  // https://stackoverflow.com/questions/22859704/number-of-weeks-between-two-dates-using-javascript
  calculateWeeksBetween(date1: Date, date2: Date) {
    // The number of milliseconds in one week
    var ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms);
    // Convert back to weeks and return hole weeks
    return Math.floor(difference_ms / ONE_WEEK);
  }

  addWeeksToDate(date: Date, weeks: number): Date {
    var d = new Date(date);
    d.setDate(date.getDate() + 7 * weeks);
    return d;
  }
}
