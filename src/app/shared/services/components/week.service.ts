import { Injectable, Inject } from '@angular/core';
import { DateService } from '../util/date.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'ng-ausbildungsnachweise-weeks';

@Injectable({
  providedIn: 'root'
})
export class WeekService {
  weeks: Week[] = [];
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private dateService: DateService) { }

  getFromStorage() {
    const weeks = this.storage.get(STORAGE_KEY);
    if (weeks !== null && weeks !== undefined) { this.weeks = weeks; }
    else { this.weeks = []; }

    for (const week of this.weeks) {
      week.date = new Date(week.date);
    }
  }
  saveToStorage() {
    this.storage.set(STORAGE_KEY, this.weeks);
  }
  duplicateWeek(week: Week) {
    this.weeks.push({
      id: this.weeks[this.weeks.length - 1].id + 1,
      nr: week.nr + 1,
      department: week.department, year: week.year,
      startDate: week.startDate, endDate: week.endDate,
      date: this.dateService.getNextWeekDate(week.date),
      weekdays: week.weekdays
    });
    this.saveToStorage();
  }
  duplicateMultipleWeeks(weeks: Week[]) {
    for (const week of weeks) {
      this.weeks.push({
        id: this.weeks[this.weeks.length - 1].id + 1,
        nr: week.nr + 1,
        department: week.department, year: week.year,
        startDate: week.startDate, endDate: week.endDate,
        date: this.dateService.getNextWeekDate(week.date),
        weekdays: week.weekdays
      });
    }
    this.saveToStorage();
  }
  deleteWeek(week: Week) {
    this.weeks.splice(this.weeks.findIndex((w) => w.id === week.id), 1);
    this.sortWeeks();
    this.saveToStorage();
  }
  deleteMultipleWeeks(weeks: Week[]) {
    for (const week of weeks) {
      this.weeks.splice(this.weeks.findIndex((w) => w.id === week.id), 1);
    }
    this.sortWeeks();
    this.saveToStorage();
  }
  saveWeek(week: Week) {
    this.weeks[this.weeks.findIndex((w) => w.id === week.id)] = week;
    this.sortWeeks();
    this.saveToStorage();
  }
  getEmptyWeek(date?: Date): Week {
    return {
      department: this.weeks.length > 1 ? this.weeks[this.weeks.length - 1].department : 'Atiw Paderborn',
      date: date ? date : this.dateService.getMonday(new Date()),
      weekdays: [
        { hours: 7.5, content: '' },
        { hours: 7.5, content: '' },
        { hours: 7.5, content: '' },
        { hours: 7.5, content: '' },
        { hours: 7.5, content: '' },
      ]
    };
  }
  addWeek(week: Week) { week.id = this.getID(); this.weeks.push(week); this.saveToStorage(); }
  clearWeeks() { this.weeks = []; this.saveToStorage(); }
  importWeeks(weeks: Week[], clearWeeks?: boolean): Week[] {
    if (clearWeeks) { this.clearWeeks(); }
    for (const week of weeks) {
      try {
        for (let index = 0; index < 5; index++) {
          const content = week.weekdays[index].content;
          let splitted = [];
          if (content.length > 0) { splitted = content.split('\n'); }
          let pushLast = true;
          while (splitted.length < 8) {
            pushLast ? splitted.push('') : splitted.unshift('');
            pushLast = !pushLast;
          }
          week.weekdays[index].content = splitted.join('\n');
        }
        week.startDate = this.dateService.germanLocalToDate(week.startDate).toUTCString();
        week.date = this.dateService.getMonday(new Date(week.startDate));
        week.nr = this.dateService.getNumber(week.date);
        this.addWeek(week);
      } catch (e) { console.log('Invalid Week'); console.error(e); }
    }
    this.sortWeeks();
    return weeks;
  }

  private getID() {
    if (this.weeks.length === 0) { return 0; }
    return this.weeks[this.weeks.length - 1].id + 1;
  }

  private sortWeeks() {
    this.weeks.sort(function (a, b) { return a.nr - b.nr; });
    let id = 0;
    for (const week of this.weeks) { week.id = id++; }
  }
}