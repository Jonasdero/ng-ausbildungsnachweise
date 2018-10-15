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
  hours = [
    { value: 'hMo', day: 'Montag' }, { value: 'hDi', day: 'Dienstag' },
    { value: 'hMi', day: 'Mittwoch' }, { value: 'hDo', day: 'Donnerstag' },
    { value: 'hFr', day: 'Freitag' }
  ]
  form: FormGroup;

  get(type: string): AbstractControl { return this.form.get(type); }

  constructor(private weekService: WeekService, private dateService: DateService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'department': new FormControl(this.week.department, Validators.required),
      'date': new FormControl(this.week.date, Validators.required),
      'hMo': new FormControl(this.week.hMo, Validators.required),
      'hDi': new FormControl(this.week.hDi, Validators.required),
      'hMi': new FormControl(this.week.hMi, Validators.required),
      'hDo': new FormControl(this.week.hDo, Validators.required),
      'hFr': new FormControl(this.week.hFr, Validators.required),
      'contentMo': new FormControl(this.mergeContent('Mo'), [Validators.required, validateContent]),
      'contentDi': new FormControl(this.mergeContent('Di'), [Validators.required, validateContent]),
      'contentMi': new FormControl(this.mergeContent('Mi'), [Validators.required, validateContent]),
      'contentDo': new FormControl(this.mergeContent('Do'), [Validators.required, validateContent]),
      'contentFr': new FormControl(this.mergeContent('Fr'), [Validators.required, validateContent]),
    })

    this.form.valueChanges.subscribe(() => {
      for (var prop in this.form.value) {
        if (prop.startsWith('content')) this.splitContent(prop, this.get(prop).value);
        else this.week[prop] = this.get(prop).value;
      }
      this.weekService.saveWeek(this.week);
    })
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
    while (splitted.length < 8) splitted.push('');
    for (let i = 1; i <= 8; i++)
      this.week[name + i] = splitted[i - 1];
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
