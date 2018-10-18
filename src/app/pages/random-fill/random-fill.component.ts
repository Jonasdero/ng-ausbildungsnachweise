import { COMMA, ENTER, DASH } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { WeekService, DateService, SettingsService } from 'src/app/shared';
import { MatChipInputEvent } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-random-fill',
  templateUrl: './random-fill.component.html',
  styleUrls: ['./random-fill.component.scss']
})
export class RandomFillComponent implements OnInit {
  contents: Content[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private weekService: WeekService, private dateService: DateService,
    private settingsService: SettingsService) { }

  startDateControl = new FormControl(this.dateService.getMonday(new Date()), Validators.required);
  endDateControl = new FormControl(this.dateService.getMonday(new Date()), Validators.required);

  ngOnInit() {
    var weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
    var notAllowed = ['Urlaub', 'Studienpräsenz'];
    let weeks = this.weekService.getWeeks();
    for (let week of weeks) for (let day of weekDays) for (let i = 1; i <= 8; i++) {
      let content: string = week['content' + day + i].trim();
      if (content === '' || notAllowed.includes(content)) continue;
      var broke = false;
      for (let c of this.contents) if (c.value === content) {
        broke = true;
        break
      }
      if (broke) continue;
      this.contents.push({ value: content, importance: 1 });
    }
  }

  generate() {
    var weeks = this.dateService.calculateWeeksBetween(this.startDateControl.value, this.endDateControl.value) + 1;
    var contents = [];
    for (let content of this.contents) {
      while (content.importance > 0) {
        contents.push(content.value);
        content.importance--;
      }
    }
    for (var i = 0; i < weeks; i++) {
      let currentDate = this.dateService.addWeeksToDate(this.startDateControl.value, i);
      var weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
      let week: Week = {
        date: currentDate, nr: this.dateService.getAusbildungsNachweisNr(currentDate),
        department: this.settingsService.settings.praxis, year: this.dateService.getAusbildungsJahr(currentDate),
        startDate: this.dateService.getLocaleDateString(currentDate),
        endDate: this.dateService.getLocaleDateString(this.dateService.getFriday(currentDate)),
        hMo: 7.5, hDi: 7.5, hMi: 7.5, hDo: 7.5, hFr: 7.5,
        contentMo1: '', contentMo2: '', contentMo3: '', contentMo4: '',
        contentMo5: '', contentMo6: '', contentMo7: '', contentMo8: '',
        contentDi1: '', contentDi2: '', contentDi3: '', contentDi4: '',
        contentDi5: '', contentDi6: '', contentDi7: '', contentDi8: '',
        contentMi1: '', contentMi2: '', contentMi3: '', contentMi4: '',
        contentMi5: '', contentMi6: '', contentMi7: '', contentMi8: '',
        contentDo1: '', contentDo2: '', contentDo3: '', contentDo4: '',
        contentDo5: '', contentDo6: '', contentDo7: '', contentDo8: '',
        contentFr1: '', contentFr2: '', contentFr3: '', contentFr4: '',
        contentFr5: '', contentFr6: '', contentFr7: '', contentFr8: '',
      }
      for (let day of weekDays)
        this.splitContent(week, 'content' + day, this.getRandomContents(contents));
      this.weekService.addWeek(week);
    }
  }
  getRandomContents(contents: string[]): string[] {
    var result = [];
    var actions = Math.floor(Math.random() * 5) + 2;
    for (let i = 0; i < actions; i++) {
      var c = contents[Math.floor(Math.random() * (contents.length - 1))];
      if (result.includes(c)) continue;
      result.push(c);
    }
    return result;
  }
  higherImportance(content: Content) { content.importance++; }
  sort() { this.contents.sort((a: Content, b: Content) => { return b.importance - a.importance; }) }
  onlyMondays = (d: Date): boolean => { return d.getDay() === 1; }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim())
      this.contents.push({ value: value.trim(), importance: 1 });
    if (input) input.value = '';
  }
  remove(content: Content): void {
    const index = this.contents.indexOf(content);
    if (index >= 0) this.contents.splice(index, 1);
  }
  splitContent(week: Week, name: string, content: string[]) {
    let pushLast = true;
    while (content.length < 8) {
      pushLast ? content.push('') : content.unshift('');
      pushLast = !pushLast;
    }
    for (let i = 1; i <= 8; i++)
      week[name + i] = content[i - 1];
  }
}