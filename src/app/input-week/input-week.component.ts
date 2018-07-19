import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Department } from '../shared/department';
import { WeekService } from '../shared/week.service';

@Component({
  selector: 'input-week',
  templateUrl: './input-week.component.html',
  styleUrls: ['./input-week.component.scss']
})
export class InputWeekComponent implements OnInit {
  @Input() week: Week;
  departments: Department[] = [Department.Atiw, Department.Praxis, Department.Spe];
  hours = [
    { value: 'hMo', day: 'Montag' }, { value: 'hDi', day: 'Dienstag' },
    { value: 'hMi', day: 'Mittwoch' }, { value: 'hDo', day: 'Donnerstag' },
    { value: 'hFr', day: 'Freitag' }
  ]
  form: FormGroup;

  get(type: string): AbstractControl {
    return this.form.get(type);
  }

  constructor(private weekService: WeekService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = new FormGroup({
      'department': new FormControl(this.week.department, Validators.required),
      'date': new FormControl(this.week.date, Validators.required),
      'hMo': new FormControl(this.week.hMo, Validators.required),
      'hDi': new FormControl(this.week.hDi, Validators.required),
      'hMi': new FormControl(this.week.hMi, Validators.required),
      'hDo': new FormControl(this.week.hDo, Validators.required),
      'hFr': new FormControl(this.week.hFr, Validators.required),
      'contentMo': new FormControl(this.mergeContent('Mo'), Validators.required),
      'contentDi': new FormControl(this.mergeContent('Di'), Validators.required),
      'contentMi': new FormControl(this.mergeContent('Mi'), Validators.required),
      'contentDo': new FormControl(this.mergeContent('Do'), Validators.required),
      'contentFr': new FormControl(this.mergeContent('Fr'), Validators.required),
    })
    this.form.valueChanges.subscribe((data) => {
      for (var prop in this.form.value) {
        if (prop.startsWith('content')) {
          this.splitContent(prop, this.get(prop).value);
        }
        else this.week[prop] = this.get(prop).value;
      }
      this.weekService.saveWeek(this.week);
    })
  }
  mergeContent(day: string) {
    let result: string = '';
    for (let i = 1; i <= 8; i++) {
      if (i == 8) result += this.week['content' + day + i];
      else result += this.week['content' + day + i] + '\n';
    }
    return result;
  }

  splitContent(name: string, content: string) {
    let splitted = content.split('\n');
    for (let i = 1; i <= 8; i++) {
      this.week[name + i] = splitted[i - 1];
    }
  }
  dateFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day === 1;
  }

  duplicate() { this.weekService.duplicateWeek(this.week); }
  delete() { this.weekService.deleteWeek(this.week); }
}
