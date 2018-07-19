import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, Form } from '@angular/forms';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  form: FormGroup;
  constructor(private settingsService: SettingsService, private formBuilder: FormBuilder) { }

  get(prop: string) { return this.form.get(prop); }

  ngOnInit() {
    this.settingsService.getSettings().subscribe((settings) => {
      this.form = new FormGroup({
        'vorname': new FormControl(settings.vorname, Validators.required),
        'nachname': new FormControl(settings.nachname, Validators.required),
        'ausbildungsStart': new FormControl(settings.ausbildungsStart, Validators.required),
        'beruf': new FormControl(settings.beruf, Validators.required),
        'spe': new FormControl(settings.spe, Validators.required),
        'atiw': new FormControl(settings.atiw, Validators.required),
        'praxis': new FormControl(settings.praxis, Validators.required),
      })
    })
  }
  save() {
    let settings: Settings = {};
    console.log(this.form);
    for (var prop in this.form.value) {
      console.log(prop);
      settings[prop] = this.get(prop).value;
    }
    this.settingsService.saveSettings(settings);
  }
}
