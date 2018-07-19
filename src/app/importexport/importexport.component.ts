import { Component, OnInit } from '@angular/core';
import { WeekService } from '../shared/services/week.service';
import { SettingsService } from '../shared/services/settings.service';


@Component({
  selector: 'app-importexport',
  templateUrl: './importexport.component.html'
})
export class ImportexportComponent implements OnInit {


  constructor(private weekService: WeekService, private settingsService: SettingsService) { }

  ngOnInit() { }

  export() {
    var sJson = JSON.stringify({ settings: this.settingsService.settings, weeks: this.weekService.getWeeks() }, null, 4);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "export.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  importObject = {
    "settings": {
      "vorname": "Jonas",
      "nachname": "Roser",
      "ausbildungsStart": "04.09.2016",
      "beruf": "Fachinformatiker Anwendungsentwicklung",
      "spe": "Siemens Professional Education Paderborn",
      "atiw": "Atiw Paderborn",
      "praxis": "Atos, AIS GER HR PD Azubi"
    },
    "weeks": [
      {
        "department": "Atiw Paderborn",
        "date": "19.07.2017",
        "hMo": 7.5,
        "hDi": 7.5,
        "hMi": 7.5,
        "hDo": 7.5,
        "hFr": 7.5,
        "contentMo": "",
        "contentDi": "",
        "contentMi": "",
        "contentDo": "",
        "contentFr": "",
      },
      {
        "department": "Atiw Paderborn",
        "date": "25.07.2017",
        "hMo": 7.5,
        "hDi": 7.5,
        "hMi": 7.5,
        "hDo": 7.5,
        "hFr": 7.5,
        "contentMo": "",
        "contentDi": "",
        "contentMi": "",
        "contentDo": "",
        "contentFr": "",
      }
    ]
  }
}