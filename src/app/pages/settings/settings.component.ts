import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SettingsService, DateService } from '../../shared';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  constructor(private settingsService: SettingsService, private dateService: DateService) { }

  get(prop: string) { return this.form.get(prop); }

  ngOnInit() {
    this.settingsService.getSettings().subscribe((settings) => {
      this.form = new FormGroup({
        'vorname': new FormControl(settings.vorname, Validators.required),
        'nachname': new FormControl(settings.nachname, Validators.required),
        'ausbildungsStartDate': new FormControl(settings.ausbildungsStartDate, Validators.required),
        'beruf': new FormControl(settings.beruf, Validators.required),
        'spe': new FormControl(settings.spe, Validators.required),
        'atiw': new FormControl(settings.atiw, Validators.required),
        'praxis': new FormControl(settings.praxis, Validators.required),
      });
    });
    this.form.valueChanges.subscribe(values => { this.save(); });
  }

  save() {
    const settings: Settings = {};
    for (const prop in this.form.value) {
      settings[prop] = this.get(prop).value;
    }
    settings.ausbildungsStart = this.dateService.getLocaleDateString(settings.ausbildungsStartDate);
    this.settingsService.saveSettings(settings);
  }
}
