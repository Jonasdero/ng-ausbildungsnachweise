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
      hMo: week.hMo, hDi: week.hDi, hMi: week.hMi, hDo: week.hDo, hFr: week.hFr,
      contentMo1: week.contentMo1, contentMo2: week.contentMo2, contentMo3: week.contentMo3, contentMo4: week.contentMo4,
      contentMo5: week.contentMo5, contentMo6: week.contentMo6, contentMo7: week.contentMo7, contentMo8: week.contentMo8,
      contentDi1: week.contentDi1, contentDi2: week.contentDi2, contentDi3: week.contentDi3, contentDi4: week.contentDi4,
      contentDi5: week.contentDi5, contentDi6: week.contentDi6, contentDi7: week.contentDi7, contentDi8: week.contentDi8,
      contentMi1: week.contentMi1, contentMi2: week.contentMi2, contentMi3: week.contentMi3, contentMi4: week.contentMi4,
      contentMi5: week.contentMi5, contentMi6: week.contentMi6, contentMi7: week.contentMi7, contentMi8: week.contentMi8,
      contentDo1: week.contentDo1, contentDo2: week.contentDo2, contentDo3: week.contentDo3, contentDo4: week.contentDo4,
      contentDo5: week.contentDo5, contentDo6: week.contentDo6, contentDo7: week.contentDo7, contentDo8: week.contentDo8,
      contentFr1: week.contentFr1, contentFr2: week.contentFr2, contentFr3: week.contentFr3, contentFr4: week.contentFr4,
      contentFr5: week.contentFr5, contentFr6: week.contentFr6, contentFr7: week.contentFr7, contentFr8: week.contentFr8,
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
  addWeek(week: Week) { week.id = this.getID(); this.weeks.push(week); }
  getWeeks(): Week[] { return this.weeks; }
  clearWeeks() { this.weeks = []; }
  importWeeks(weeks: Week[]): Week[] {
    this.clearWeeks();
    var weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
    for (let week of weeks) {
      try {
        for (let weekDay of weekDays) {
          let content = week['content' + weekDay];
          let splitted = [];
          if (content.length > 0)
            splitted = content.split('\n');
          let pushLast = true;
          while (splitted.length < 8) {
            pushLast ? splitted.push('') : splitted.unshift('');
            pushLast = !pushLast;
          }
          for (let i = 1; i <= 8; i++)
            week['content' + weekDay + i] = splitted[i - 1];
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
    return this.weeks[this.weeks.length - 1].id;
  }

  sortWeeks() {
    this.weeks.sort(function (a, b) { return a.nr - b.nr; });
    var id = 0;
    for (let week of this.weeks) week.id = id++;
  }
}