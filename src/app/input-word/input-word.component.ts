import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Department } from '../shared/department';

@Component({
  selector: 'app-input-word',
  templateUrl: './input-word.component.html',
  styleUrls: ['./input-word.component.scss']
})
export class InputWordComponent implements OnInit {
  weeks: Week[] = [];

  form: FormGroup;

  get surname() { return this.form.get('surname'); }
  get name() { return this.form.get('name'); }
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = new FormGroup({
      'surname': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
    })
  }

  newWeek() {
    this.weeks.push({
      nr: 0, department: Department.Praxis.toString(), year: 1, startDate: new Date().toLocaleDateString(),
      endDate: new Date().toLocaleDateString(), date: new Date(),
      hMo: 7.5, hDi: 7.5, hMi: 7.5, hDo:7.5, hFr: 7.5,
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
    })
    console.log(this.weeks);
  }

}
