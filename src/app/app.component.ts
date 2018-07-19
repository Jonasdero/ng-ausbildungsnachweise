import { Component, OnInit } from '@angular/core';
import { SettingsService } from './shared/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  description: string = "";
  constructor(private settingsService: SettingsService) { }


  ngOnInit() {
    this.settingsService.getSettings().subscribe((settings: Settings) => {
      this.settingsService.settings = settings;
      this.description = settings.name + " " + settings.surname;
    });
  }
}
