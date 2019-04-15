import { Component, OnInit } from '@angular/core';
import { WeekService, SettingsService, DateService, WordService, AuthService } from '../../shared';

@Component({
  selector: 'app-input-word',
  templateUrl: './input-word.component.html'
})
export class InputWordComponent implements OnInit {
  step = 0;
  weeks: Week[] = [];
  departments: string[] = [];
  settings: Settings;
  constructor(private weekService: WeekService, private setService: SettingsService,
    private word: WordService, private date: DateService, public auth: AuthService) { }

  ngOnInit() {
    this.getWeeks();
    this.setService.getSettings().subscribe((settings: Settings) => {
      this.settings = settings;
      this.departments = [settings.atiw, settings.spe, settings.praxis];
    });
  }
  getWeeks() {
    this.weeks = this.weekService.weeks;
    console.log(this.weeks);
  }

  // Template Functions
  newWeek() {
    this.step = this.weeks.length;
    this.weekService.addWeek(this.weekService.getEmptyWeek());
    this.getWeeks();
  }
  stepChanged(value: number) {
    if (this.step === 0 && this.weeks.length > 0) { this.step = 0; }
    else if (this.step === 0 && this.weeks.length === 0) { this.step = -1; }
    else { this.step = value; }
  }
  clearWeeks() { this.step = -1; this.weekService.clearWeeks(); this.getWeeks(); }
  save() { this.word.save(this.weeks); }
}