import { Component, OnInit } from '@angular/core';
import { WeekService } from './shared/services/components/week.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private weekService: WeekService) { }


  ngOnInit() {
    this.weekService.addWeek(this.weekService.getEmptyWeek());
  }
}