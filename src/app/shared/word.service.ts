import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { WeekService } from './week.service';

import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import * as Docxtemplater from 'docxtemplater';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private settingsService: SettingsService, private weekService: WeekService) { }
  save(weeks: Week[]) {
    for (let week of weeks) {
      this.improveWeekDate(week);
      this.exportToDocx(week);
    }
  }

  private improveWeekDate(week: Week) {
    let settings = this.settingsService.settings;
    let ausbildungsStart = new Date(settings.ausbildungsStart);
    week.nr = Math.floor(Math.ceil(Math.abs(week.date.getTime()
      - ausbildungsStart.getTime()) / (1000 * 3600 * 24)) / 7) + 1;

    week.year = Math.ceil(Math.abs(week.date.getTime() - ausbildungsStart.getTime())
      / (1000 * 3600 * 24 * 365))

    week.startDate = week.date
      .toLocaleDateString('de', { day: "2-digit", month: "2-digit", year: "numeric" })
    week.endDate = this.weekService.getFriday(week.date)
      .toLocaleDateString('de', { day: "2-digit", month: "2-digit", year: "numeric" })

    week.beruf = settings.beruf;
    week.name = settings.nachname;
    week.surname = settings.vorname;
    week.hSum = +week.hMo + +week.hDi + +week.hMi + +week.hDo + +week.hFr + '';
  }

  private exportToDocx(week: Week) {
    JSZipUtils.getBinaryContent("assets/VorlageGeneric.docx", function (error, content) {
      if (error) { throw error };
      var zip = new JSZip(content);
      var doc = new Docxtemplater().loadZip(zip)
      doc.setData(week);

      try {
        doc.render()
      }
      catch (error) {
        var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        }
        console.log(JSON.stringify({ error: e }));
        throw error;
      }

      var out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
      let filename = week.nr.toString().padStart(3, '0') + "_" + week.startDate + ".docx";
      FileSaver.saveAs(out, filename);
    })
  }

}
