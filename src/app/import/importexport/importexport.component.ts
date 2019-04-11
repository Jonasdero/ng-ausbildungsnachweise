import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';

import { WeekService, SettingsService, DateService, WordService, NotificationService } from '../../shared';
import { ImportDialogComponent } from '../import-dialog/import-dialog.component';

@Component({
  selector: 'app-importexport',
  templateUrl: './importexport.component.html'
})
export class ImportexportComponent implements OnInit {
  dialogRef: MatDialogRef<ImportDialogComponent> | null;

  importObject = {
    'settings': {
      'vorname': 'Klaus',
      'nachname': 'Frieder',
      'ausbildungsStart': '04.09.2016',
      'beruf': 'Fachinformatiker Anwendungsentwicklung',
      'spe': 'Siemens Professional Education Paderborn',
      'atiw': 'Atiw Paderborn',
      'praxis': 'Atos, AIS GER HR PD Azubi'
    },
    'weeks': [
      {
        'department': 'Atiw Paderborn',
        'startDate': '19.07.2017',
        'weekdays': [{
          'hours': 7.5,
          'content': 'AEW: Super tolle Java Klasse\nITN: Jede Menge Schwachsinn\nITÖ: Was mach ich hier eigentlich?'
        }, {
          'hours': 7.5,
          'content': 'AEW: Super tolle Java Klasse2\nITN: Mehr Schwachsinn\nITÖ: Was mach ich hier eigentlich?'
        }, {
          'hours': 7.5,
          'content': 'AEW: Super tolle Java Klasse3\nITN: Noch mehr Schwachsinn\nITÖ: Was mach ich hier eigentlich?'
        }, {
          'hours': 7.5,
          'content': 'AEW: Super tolle Java Klasse4\nITN: Jetzt langts aber\nITÖ: Was mach ich hier eigentlich?'
        }, {
          'hours': 7.5,
          'content': 'AEW: Super tolle Java Klasse5\nITN: Stop\nITÖ: Was mach ich hier eigentlich?'
        }
        ]
      }
    ]
  };

  constructor(private weekService: WeekService, private settingsService: SettingsService,
    private wordService: WordService, private dateService: DateService, public dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() { }

  import() {
    this.dialogRef = this.dialog.open(ImportDialogComponent, {});
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) { return; }
      try {
        const obj = JSON.parse(paramsDialog.data);
        obj.settings.ausbildungsStartDate = this.dateService.germanLocalToDate(obj.settings.ausbildungsStart);
        this.settingsService.saveSettings(obj.settings);
        const weeks = this.weekService.importWeeks(obj.weeks, paramsDialog.clearWeeks);
        if (paramsDialog.save) { this.wordService.save(weeks); }
        this.notificationService.info(weeks.length + ' Wochen importiert!');
      }
      catch (e) { console.log(e); }
    });
  }

  export() {
    const weeks: Week[] = this.weekService.weeks;
    const userWeeks = [];

    for (const week of weeks) {
      const userWeek = {};
      userWeek['startDate'] = this.dateService.getLocaleDateString(week.date);
      userWeek['department'] = week.department;
      userWeek['weekdays'] = week.weekdays;
      userWeeks.push(userWeek);
    }
    this.settingsService.getSettings().subscribe(settings => {
      const obj = JSON.stringify({ settings: settings, weeks: userWeeks }, null, 4);
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/json;charset=UTF-8,' + encodeURIComponent(obj));
      element.setAttribute('download', 'export.json');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      this.notificationService.info(userWeeks.length + ' Wochen exportiert!');
    });
    console.log(weeks);
  }

}