import { Component, OnInit } from '@angular/core';
import { WeekService, SettingsService, DateService, WordService, AuthService } from '../../shared';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-input-word',
  templateUrl: './input-word.component.html'
})
export class InputWordComponent implements OnInit {
  // Pagination
  page = 1;
  pageSize = 5;

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
    this.correctPage();
  }

  // Template Functions
  newWeek() {
    this.step = this.weeks.length - ((this.page - 1) * this.pageSize);
    this.weekService.addWeek(this.weekService.getEmptyWeek());
    this.getWeeks();
  }
  save() {
    this.word.save(this.weeks);
  }
  clearWeeks() {
    this.step = -1;
    this.page = 1;
    this.weekService.clearWeeks();
    this.getWeeks();
  }
  stepChanged(value: number) {
    if (this.step === 0 && this.weeks.length > 0) { this.step = 0; }
    else if (this.step === 0 && this.weeks.length === 0) { this.step = -1; }
    else { this.step = value; }
    this.correctPage();
  }
  paginatorChange(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.page = pageEvent.pageIndex + 1;
  }
  correctPage() {
    // If step should be on other page set step on last possible step on current page
    if (this.step > this.pageSize - 1) {
      this.step = this.pageSize - 1;
    }
  }
}