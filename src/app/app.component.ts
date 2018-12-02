import { Component, OnInit } from '@angular/core';
import { SettingsService } from './shared/services/components/settings.service';
import { WeekService } from './shared/services/components/week.service';
import { DateService } from './shared/services/util/date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private weekService: WeekService,
    private dateService: DateService) { }


  ngOnInit() {
    this.weekService.addWeek(this.weekService.getEmptyWeek());
  }
}