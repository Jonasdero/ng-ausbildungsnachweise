import { Injectable } from '@angular/core';
import { DateService } from '../util/date.service';

@Injectable({
  providedIn: 'root'
})
export class WeekService {
  weeks: Week[] = [];
  constructor(private dateService: DateService) { }

  duplicateWeek(week: Week) {
    this.weeks.push({
      id: this.weeks[this.weeks.length - 1].id + 1,
      nr: week.nr + 1,
      department: week.department, year: week.year,
      startDate: week.startDate, endDate: week.endDate,
      date: this.dateService.getNextWeekDate(week.date),
      weekdays: week.weekdays
    })
  }
  deleteWeek(week: Week) {
    this.weeks.splice(this.weeks.findIndex((w) => w.id === week.id), 1);
    this.sortWeeks();
  }
  saveWeek(week: Week) {
    this.weeks[this.weeks.findIndex((w) => w.id === week.id)] = week;
    this.sortWeeks();
  }
  getEmptyWeek(date?: Date): Week {
    return {
      department: 'Atiw Paderborn', date: date ? date : this.dateService.getMonday(new Date()),
      weekdays: [
        { hours: 7.5, content: '' },
        { hours: 7.5, content: '' },
        { hours: 7.5, content: '' },
        { hours: 7.5, content: '' },
        { hours: 7.5, content: '' },
      ]
    }
  }
  addWeek(week: Week) { week.id = this.getID(); this.weeks.push(week); }
  clearWeeks() { this.weeks = []; }
  importWeeks(weeks: Week[], clearWeeks?: boolean): Week[] {
    if (clearWeeks) this.clearWeeks();
    for (let week of weeks) {
      try {
        for (let index = 0; index <= 5; index++) {
          let content = week.weekdays[index].content;
          let splitted = [];
          if (content.length > 0)
            splitted = content.split('\n');
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
      }
      catch (e) { console.error('Invalid Week'); }
    }
    this.sortWeeks();
    return weeks;
  }

  private getID() {
    if (this.weeks.length === 0) return 0;
    return this.weeks[this.weeks.length - 1].id;
  }

  private sortWeeks() {
    this.weeks.sort(function (a, b) { return a.nr - b.nr; });
    var id = 0;
    for (let week of this.weeks) week.id = id++;
  }
}