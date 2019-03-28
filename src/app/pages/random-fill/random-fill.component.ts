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
  constructor(private weekService: WeekService, private dateService: DateService) { }

  startDateControl = new FormControl(this.dateService.getMonday(new Date()), Validators.required);
  endDateControl = new FormControl(this.dateService.getMonday(new Date()), Validators.required);

  ngOnInit() {
    var notAllowed = ['Urlaub', 'Studienpräsenz'];
    let weeks = this.weekService.weeks;
    for (let week of weeks)
      for (let d = 0; d < 5; d++) {
        week.weekdays[d].contents = week.weekdays[d].content.split('\n');
        for (let i = 1; i <= 8; i++) {
          let content: string = week.weekdays[d].contents[i] ? week.weekdays[d].contents[i].trim() : '';
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
    this.contents = [];
    for (var i = 0; i < weeks; i++) {
      let currentDate = this.dateService.addWeeksToDate(this.startDateControl.value, i);
      let week: Week = this.weekService.getEmptyWeek(currentDate);
      for (let i = 0; i < 5; i++)
        week.weekdays[i].content = this.getRandomContents(contents).join('\n');
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

  // Template Functions
  higherImportance(content: Content) { content.importance++; }
  sort() { this.contents.sort((a: Content, b: Content) => { return b.importance - a.importance; }) }
  onlyMondays(d: Date): boolean { return d.getDay() === 1; }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (value)
      this.contents.push({ value: value.trim(), importance: 1 });
    if (input) input.value = '';
  }
  remove(content: Content): void {
    const index = this.contents.indexOf(content);
    if (index >= 0) this.contents.splice(index, 1);
  }
}