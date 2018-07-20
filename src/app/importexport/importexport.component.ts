import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';

import { WeekService } from '../shared/services/week.service';
import { SettingsService } from '../shared/services/settings.service';
import { ImportDialogComponent } from '../import-dialog/import-dialog.component';
import { WordService } from '../shared/services/word.service';
import { DateService } from '../shared/services/date.service';

@Component({
  selector: 'app-importexport',
  templateUrl: './importexport.component.html'
})
export class ImportexportComponent implements OnInit {
  dialogRef: MatDialogRef<ImportDialogComponent> | null;

  constructor(private weekService: WeekService, private settingsService: SettingsService,
    private wordService: WordService, private dateService: DateService, public dialog: MatDialog) { }

  ngOnInit() { }

  import() {
    this.dialogRef = this.dialog.open(ImportDialogComponent, {});
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) { return; }
      try {
        var obj = JSON.parse(paramsDialog.data);
        obj.settings.ausbildungsStart = this.dateService.germanLocalToDate(obj.settings.ausbildungsStart);
        this.settingsService.saveSettings(obj.settings);
        let weeks = this.weekService.importWeeks(obj.weeks);
        this.wordService.save(weeks);
      }
      catch (e) { console.log(e); }
    });
  }

  export() {
    var weeks = this.weekService.getWeeks();
    var userWeeks = [];

    for (let week of weeks) {
      let userWeek = {};
      userWeek['startDate'] = this.dateService.getLocaleDateString(week.date);
      userWeek['department'] = week.department;
      let weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
      for (let weekday of weekDays) {
        userWeek['h' + weekday] = week['h' + weekday];
        userWeek['content' + weekday] = '';
        for (let i = 1; i <= 8; i++) {
          if (week['content' + weekday + i].length === 0) continue;
          userWeek['content' + weekday] += week['content' + weekday + i];
          if (i <= 8) userWeek['content' + weekday] += '\n';
        }
      }
      userWeeks.push(userWeek);
    }
    var settings = this.settingsService.settings;
    settings.ausbildungsStart = this.dateService.getLocaleDateString(new Date(settings.ausbildungsStart));
    var obj = JSON.stringify({ settings: settings, weeks: userWeeks }, null, 4);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(obj));
    element.setAttribute('download', "export.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  importObject = {
    "settings": {
      "vorname": "Marc",
      "nachname": "Roser",
      "ausbildungsStart": "07.09.2016",
      "beruf": "Fachinformatiker Anwendungsentwicklung",
      "spe": "Siemens Professional Education Paderborn",
      "atiw": "Atiw Paderborn",
      "praxis": "Atos, AIS GER HR PD Azubi"
    },
    "weeks": [
      {
        "department": "Atiw Paderborn",
        "startDate": "19.07.2017",
        "hMo": 7.5,
        "hDi": 7.5,
        "hMi": 7.5,
        "hDo": 7.5,
        "hFr": 7.5,
        "contentMo": "AEW: Super tolle Java Klasse\nITN: Jede Menge Schwachsinn\nITÖ: Was mach ich hier eigentlich?",
        "contentDi": "AEW: Super tolle Java Klasse2\nITN: Mehr Schwachsinn\nITÖ: Was mach ich hier eigentlich?",
        "contentMi": "AEW: Super tolle Java Klasse3\nITN: Noch mehr Schwachsinn\nITÖ: Was mach ich hier eigentlich?",
        "contentDo": "AEW: Super tolle Java Klasse4\nITN: Jetzt langts aber\nITÖ: Was mach ich hier eigentlich?",
        "contentFr": "AEW: Super tolle Java Klasse5\nITN: Stop\nITÖ: Was mach ich hier eigentlich?"
      },
      {
        "department": "Atiw Paderborn",
        "startDate": "25.07.2017",
        "hMo": 7.5,
        "hDi": 0,
        "hMi": 7.5,
        "hDo": 7.5,
        "hFr": 0,
        "contentMo": "\n\n\nKlaus\nHerr Böhmer",
        "contentDi": "",
        "contentMi": "\n\n\nLoriiiii",
        "contentDo": "\n\n\nAugschburg",
        "contentFr": ""
      }
    ]
  }
}