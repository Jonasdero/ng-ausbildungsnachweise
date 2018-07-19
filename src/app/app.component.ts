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
      this.description = settings.vorname + " " + settings.nachname;
    });
  }

  ngOnChanges() {
    this.description = this.settingsService.settings.vorname + this.settingsService.settings.nachname;
  }
}
