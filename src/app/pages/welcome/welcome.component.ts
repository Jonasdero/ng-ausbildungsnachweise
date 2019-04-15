import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';

import { SettingsService, DateService } from '../../shared';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  nameGroup: FormGroup;
  settingsGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private settingsService: SettingsService,
    private router: Router, private dateService: DateService) { }

  ngOnInit() {
    // Comment for production
    // this.saveSettings(this.settingsService.testSettings);
    this.settingsService.getSettings().subscribe(settings => {
      this.nameGroup = this.formBuilder.group({
        firstName: [settings.vorname, Validators.required],
        lastName: [settings.nachname, Validators.required],
      });
      this.settingsGroup = this.formBuilder.group({
        ausbildungsStart: [settings.ausbildungsStartDate, Validators.required],
        beruf: [settings.beruf, Validators.required],
        spe: [settings.spe, Validators.required],
        atiw: [settings.atiw, Validators.required],
        praxis: [settings.praxis, Validators.required],
      });

      if (settings.vorname !== '' && settings.nachname !== '') {
        settings.ausbildungsStartDate = new Date(settings.ausbildungsStartDate);
        this.saveSettings(settings);
      }
    });
  }

  saveSettings(s?: Settings) {
    const settings: Settings = s ? s : {
      vorname: this.nameGroup.get('firstName').value,
      nachname: this.nameGroup.get('lastName').value,
      ausbildungsStartDate: this.settingsGroup.get('ausbildungsStart').value,
      beruf: this.settingsGroup.get('beruf').value,
      spe: this.settingsGroup.get('spe').value,
      atiw: this.settingsGroup.get('atiw').value,
      praxis: this.settingsGroup.get('praxis').value,
    };
    settings.ausbildungsStart = this.dateService.getLocaleDateString(settings.ausbildungsStartDate);
    this.settingsService.saveSettings(settings);
    setTimeout(() => {
      this.settingsService.hasSettings = true;
      this.router.navigate(['']);
    }, 500);
  }
}
