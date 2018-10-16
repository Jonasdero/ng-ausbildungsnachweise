import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import * as Docxtemplater from 'docxtemplater';
import * as FileSaver from 'file-saver';

import { SettingsService } from '../components/settings.service';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private settingsService: SettingsService, private dateService: DateService) { }
  save(weeks: Week[]) {
    for (let week of weeks) {
      this.improveWeekDate(week);
      this.exportToDocx(week);
    }
  }

  private improveWeekDate(week: Week) {
    let settings = this.settingsService.settings;
    week.nr = this.dateService.getAusbildungsNachweisNr(week.date);
    week.year = this.dateService.getAusbildungsJahr(week.date);

    week.startDate = this.dateService.getLocaleDateString(week.date);
    week.endDate = this.dateService.getLocaleDateString(this.dateService.getFriday(week.date))

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

      try { doc.render() }
      catch (error) {
        var e = { message: error.message, name: error.name, stack: error.stack, properties: error.properties, }
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