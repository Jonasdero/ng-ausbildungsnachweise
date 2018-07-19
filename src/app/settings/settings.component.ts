import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, Form } from '@angular/forms';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  form: FormGroup;
  constructor(private settingsService: SettingsService, private formBuilder: FormBuilder) { }

  get surname() { return this.form.get('surname'); }
  get name() { return this.form.get('name'); }
  get ausbildungsStart() { return this.form.get('ausbildungsStart'); }
  get beruf() { return this.form.get('beruf'); }

  ngOnInit() {
    this.settingsService.getSettings().subscribe((settings) => {
      this.form = new FormGroup({
        'name': new FormControl(settings.vorname, Validators.required),
        'surname': new FormControl(settings.nachname, Validators.required),
        'ausbildungsStart': new FormControl(this.convertGermanDateToDate(settings.ausbildungsStart), Validators.required),
        'beruf': new FormControl(settings.beruf, Validators.required),
      })
    })
  }

  convertGermanDateToDate(dateString: string): Date {
    let splitted = dateString.split('.');
    return new Date(+splitted[2], +splitted[1] - 1, +splitted[0]);
  }

  save() {
    let settings: Settings;
    for (let prop of this.form.value) {
      settings[prop] = this.form.get(prop).value;
    }
    this.settingsService.saveSettings(settings);
  }
}
