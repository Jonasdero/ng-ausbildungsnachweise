import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { WeekService, DateService } from '../../shared';

function validateContent(c: AbstractControl) {
  return c.value.split('\n').length <= 8 ? null : { length: c.value.split('\n').length };
}

@Component({
  selector: 'input-week',
  templateUrl: './input-week.component.html'
})
export class InputWeekComponent implements OnInit {
  @Input() step: number;
  @Input() departments: string[];
  @Input() week: Week;
  @Output() stepChanged: EventEmitter<number> = new EventEmitter();
  @Output() weekChanged: EventEmitter<Week> = new EventEmitter();
  everyWeekdayEqual: boolean = false;
  fullHours = [
    { value: 'hMo', day: 'Montag' }, { value: 'hDi', day: 'Dienstag' },
    { value: 'hMi', day: 'Mittwoch' }, { value: 'hDo', day: 'Donnerstag' },
    { value: 'hFr', day: 'Freitag' }
  ]
  hours = [];
  form: FormGroup;

  get(type: string): AbstractControl { return this.form.get(type); }

  constructor(private weekService: WeekService, private dateService: DateService) { }

  ngOnInit() {
    this.hours = this.fullHours;
    this.form = new FormGroup({
      'department': new FormControl(this.week.department, Validators.required),
      'date': new FormControl(this.week.date, Validators.required),
      'h': new FormControl(this.week.hMo, Validators.required),
      'hMo': new FormControl(this.week.hMo, Validators.required),
      'hDi': new FormControl(this.week.hDi, Validators.required),
      'hMi': new FormControl(this.week.hMi, Validators.required),
      'hDo': new FormControl(this.week.hDo, Validators.required),
      'hFr': new FormControl(this.week.hFr, Validators.required),
      'content': new FormControl(this.mergeContent('Mo'), [Validators.required, validateContent]),
      'contentMo': new FormControl(this.mergeContent('Mo'), [Validators.required, validateContent]),
      'contentDi': new FormControl(this.mergeContent('Di'), [Validators.required, validateContent]),
      'contentMi': new FormControl(this.mergeContent('Mi'), [Validators.required, validateContent]),
      'contentDo': new FormControl(this.mergeContent('Do'), [Validators.required, validateContent]),
      'contentFr': new FormControl(this.mergeContent('Fr'), [Validators.required, validateContent]),
    })
    this.form.valueChanges.subscribe(() => {
      for (var prop in this.form.value) {
        if (this.everyWeekdayEqual) {
          if (prop.startsWith('content') && prop.length === 8
            || prop.startsWith('h') && prop.length === 3) continue;
          else if (prop === 'content') { this.splitContentFullWeek(prop, this.get(prop).value); }
          else if (prop === 'h') {
            var days = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
            for (let i = 0; i < days.length; i++) {
              this.week[prop + days[i]] = this.get(prop).value;
            }
          }
          else this.week[prop] = this.get(prop).value;
        }
        else {
          if (prop === 'content' || prop === 'h') continue;
          if (prop.startsWith('content')) this.splitContent(prop, this.get(prop).value);
          else this.week[prop] = this.get(prop).value;
        }
      }
      this.weekService.saveWeek(this.week);
    })
  }

  everyWeekDayChange() {
    this.everyWeekdayEqual = !this.everyWeekdayEqual;
    if (!this.everyWeekdayEqual) {
      this.hours = this.fullHours;
    }
    else this.hours = [{ value: 'h', day: 'Wochenstunden' },]
  }

  mergeContent(day: string) {
    let result: string = '';
    for (let i = 1; i <= 8; i++) {
      let content = this.week['content' + day + i];
      if (content.trim().length === 0) continue;
      if (i == 8) result += content;
      else result += content + '\n';
    }
    return result;
  }

  splitContent(name: string, content: string) {
    let splitted = content.split('\n');
    let pushLast = true;
    while (splitted.length < 8) {
      pushLast ? splitted.push('') : splitted.unshift('');
      pushLast = !pushLast;
    }

    for (let i = 1; i <= 8; i++)
      this.week[name + i] = splitted[i - 1];
  }
  splitContentFullWeek(name: string, content: string) {
    let weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
    for (let weekday of weekdays) {
      this.splitContent(name + weekday, content);
    }
  }
  getAusbildungsnachweisNr() { return this.dateService.getAusbildungsNachweisNr(this.week.date); }
  onlyMondays = (d: Date): boolean => { return d.getDay() === 1; }
  duplicate() {
    this.stepChanged.emit(this.step + 1);
    setTimeout(() => this.weekService.duplicateWeek(this.week), 100);
  }
  delete() {
    this.stepChanged.emit(this.step - 1);
    setTimeout(() => this.weekService.deleteWeek(this.week), 100);
  }
}
