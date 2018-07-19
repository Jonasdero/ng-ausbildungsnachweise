import { Component, OnInit } from '@angular/core';
import { SettingsService } from './shared/services/settings.service';
import { WeekService } from './shared/services/week.service';
import { DateService } from './shared/services/date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  description: string = "";
  constructor(private settingsService: SettingsService, private weekService: WeekService,
    private dateService: DateService) { }


  ngOnInit() {
    this.settingsService.getSettings().subscribe((settings: Settings) => {
      this.description = settings.vorname + " " + settings.nachname;
    });

    this.weekService.addWeek({
      nr: 0, department: 'Atiw Paderborn', year: 1,
      startDate: '', endDate: '',
      date: this.dateService.getMonday(new Date),
      hMo: 7.5, hDi: 7.5, hMi: 7.5, hDo: 7.5, hFr: 7.5,
      contentMo1: '', contentMo2: '', contentMo3: '', contentMo4: '', contentMo5: '', contentMo6: '', contentMo7: '', contentMo8: '',
      contentDi1: '', contentDi2: '', contentDi3: '', contentDi4: '', contentDi5: '', contentDi6: '', contentDi7: '', contentDi8: '',
      contentMi1: '', contentMi2: '', contentMi3: '', contentMi4: '', contentMi5: '', contentMi6: '', contentMi7: '', contentMi8: '',
      contentDo1: '', contentDo2: '', contentDo3: '', contentDo4: '', contentDo5: '', contentDo6: '', contentDo7: '', contentDo8: '',
      contentFr1: '', contentFr2: '', contentFr3: '', contentFr4: '', contentFr5: '', contentFr6: '', contentFr7: '', contentFr8: '',
    })
  }

  ngOnChanges() {
    this.description = this.settingsService.settings.vorname + this.settingsService.settings.nachname;
  }
}
