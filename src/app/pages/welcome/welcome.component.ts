import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';

import { SettingsService } from '../../shared';

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
    private router: Router) { }

  ngOnInit() {
    this.settingsService.getSettings().subscribe(settings => {
      this.nameGroup = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      });
      this.settingsGroup = this.formBuilder.group({
        ausbildungsStart: [settings.ausbildungsStart, Validators.required],
        beruf: [settings.beruf, Validators.required],
        spe: [settings.spe, Validators.required],
        atiw: [settings.atiw, Validators.required],
        praxis: [settings.praxis, Validators.required],
      });
    });
  }

  saveSettings() {
    let settings: Settings = {
      vorname: this.nameGroup.get('firstName').value,
      nachname: this.nameGroup.get('lastName').value,
      ausbildungsStart: this.settingsGroup.get('ausbildungsStart').value,
      beruf: this.settingsGroup.get('beruf').value,
      spe: this.settingsGroup.get('spe').value,
      atiw: this.settingsGroup.get('atiw').value,
      praxis: this.settingsGroup.get('praxis').value,
    }
    this.settingsService.saveSettings(settings);
    setTimeout(() => {
      this.settingsService.initialSettingsSet = true;
      this.router.navigate([''])
    }, 1500);
  }
}
