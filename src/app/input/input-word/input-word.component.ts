import { Component, OnInit } from '@angular/core';
import { WeekService, SettingsService, DateService, WordService, AuthService } from '../../shared';

@Component({
  selector: 'input-word',
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
    })
  }
  getWeeks() { this.weeks = this.weekService.getWeeks(); }

  newWeek() {
    this.step++;
    this.weekService.addWeek({
      department: 'Atiw Paderborn', date: this.date.getMonday(new Date),
      hMo: 7.5, hDi: 7.5, hMi: 7.5, hDo: 7.5, hFr: 7.5,
      contentMo1: '', contentMo2: '', contentMo3: '', contentMo4: '', contentMo5: '', contentMo6: '', contentMo7: '', contentMo8: '',
      contentDi1: '', contentDi2: '', contentDi3: '', contentDi4: '', contentDi5: '', contentDi6: '', contentDi7: '', contentDi8: '',
      contentMi1: '', contentMi2: '', contentMi3: '', contentMi4: '', contentMi5: '', contentMi6: '', contentMi7: '', contentMi8: '',
      contentDo1: '', contentDo2: '', contentDo3: '', contentDo4: '', contentDo5: '', contentDo6: '', contentDo7: '', contentDo8: '',
      contentFr1: '', contentFr2: '', contentFr3: '', contentFr4: '', contentFr5: '', contentFr6: '', contentFr7: '', contentFr8: '',
    })
    this.getWeeks();
  }
  stepChanged(value: number) { this.step = value; }
  clearWeeks() { this.step = -1; this.weekService.clearWeeks(); this.getWeeks(); }
  save() { this.word.save(this.weeks); }
}