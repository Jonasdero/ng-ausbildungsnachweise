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
  @Input() index: number;
  @Input() departments: string[];
  @Input() week: Week;
  @Output() stepChanged: EventEmitter<number> = new EventEmitter();
  @Output() weekChanged: EventEmitter<Week> = new EventEmitter();
  everyWeekdayEqual = false;
  fullHours = [
    { value: 'hMo', day: 'Montag' }, { value: 'hDi', day: 'Dienstag' },
    { value: 'hMi', day: 'Mittwoch' }, { value: 'hDo', day: 'Donnerstag' },
    { value: 'hFr', day: 'Freitag' }
  ];
  fullContents = [
    { value: 'contentMo', day: 'Montag' },
    { value: 'contentDi', day: 'Dienstag' },
    { value: 'contentMi', day: 'Mittwoch' },
    { value: 'contentDo', day: 'Donnerstag' },
    { value: 'contentFr', day: 'Freitag' },
  ];
  hours = [];
  form: FormGroup;

  get(type: string): AbstractControl { return this.form.get(type); }

  constructor(private weekService: WeekService, private dateService: DateService) { }

  ngOnInit() {
    this.hours = this.fullHours;
    this.form = new FormGroup({
      'department': new FormControl(this.week.department, Validators.required),
      'date': new FormControl(this.week.date, Validators.required),
      'h': new FormControl(this.week.weekdays[0].hours, Validators.required),
      'hMo': new FormControl(this.week.weekdays[0].hours, Validators.required),
      'hDi': new FormControl(this.week.weekdays[1].hours, Validators.required),
      'hMi': new FormControl(this.week.weekdays[2].hours, Validators.required),
      'hDo': new FormControl(this.week.weekdays[3].hours, Validators.required),
      'hFr': new FormControl(this.week.weekdays[4].hours, Validators.required),
      'content': new FormControl(this.week.weekdays[0].content, [Validators.required, validateContent]),
      'contentMo': new FormControl(this.week.weekdays[0].content, [Validators.required, validateContent]),
      'contentDi': new FormControl(this.week.weekdays[1].content, [Validators.required, validateContent]),
      'contentMi': new FormControl(this.week.weekdays[2].content, [Validators.required, validateContent]),
      'contentDo': new FormControl(this.week.weekdays[3].content, [Validators.required, validateContent]),
      'contentFr': new FormControl(this.week.weekdays[4].content, [Validators.required, validateContent]),
    });
    this.form.valueChanges.subscribe(() => {
      for (const prop in this.form.value) {
        if (this.everyWeekdayEqual) {
          const currentValue = this.get(prop).value;
          // Skip everything that has nothing to do with everyWeekdayEqual
          // eg contentMo hMo etc
          if (prop.startsWith('content') && prop.length === 8
            || prop.startsWith('h') && prop.length === 3) {
            continue;
          }

          if (prop === 'content') {
            for (let i = 0; i < 5; i++) {
              this.splitContent(i, currentValue);
            }
          } else if (prop === 'h') {
            for (let i = 0; i < 5; i++) {
              this.week.weekdays[i].hours = currentValue;
            }
          } else {
            this.week[prop] = currentValue;
          }
        } else {
          const currentValue = this.get(prop).value;
          if (prop === 'content' || prop === 'h') {
            continue;
          }
          if (prop.startsWith('content')) {
            const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
            const dayIndex = days.findIndex(val => {
              return prop.substr(7) === val;
            });
            this.splitContent(dayIndex, currentValue);
          } else {
            this.week[prop] = currentValue;
          }
        }
      }
      this.weekService.saveWeek(this.week);
    });
  }

  splitContent(index: number, content: string) {
    const splitted = content.split('\n');
    let pushLast = true;
    while (splitted.length < 8) {
      pushLast ? splitted.push('') : splitted.unshift('');
      pushLast = !pushLast;
    }
    this.week.weekdays[index].contents = splitted;
    this.week.weekdays[index].content = splitted.join('\n');
  }

  // Template Functions
  getNumber() { return this.dateService.getNumber(this.week.date); }
  onlyMondays(d: Date): boolean { return d.getDay() === 1; }
  duplicate() {
    this.stepChanged.emit(this.step + 1);
    setTimeout(() => this.weekService.duplicateWeek(this.week), 100);
  }
  delete() {

    this.stepChanged.emit(this.step - 1);
    setTimeout(() => this.weekService.deleteWeek(this.week), 100);
  }
  everyWeekDayChange() {
    this.everyWeekdayEqual = !this.everyWeekdayEqual;
    if (!this.everyWeekdayEqual) {
      this.hours = this.fullHours;
    } else {
      this.hours = [{ value: 'h', day: 'Wochenstunden' }];
    }
  }
  opened() { this.stepChanged.emit(this.index); }
}
