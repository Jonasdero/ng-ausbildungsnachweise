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
      this.improveWeek(week);
    }
  }

  private improveWeek(week: Week) {
    this.settingsService.getSettings().subscribe(settings => {
      week.nr = this.dateService.getNumber(week.date);
      week.year = this.dateService.getYear(week.date);

      week.startDate = this.dateService.getLocaleDateString(week.date);
      week.endDate = this.dateService.getLocaleDateString(this.dateService.getFriday(week.date))

      week.beruf = settings.beruf;
      week.name = settings.nachname;
      week.surname = settings.vorname;
      var sum: number = 0;
      for (let weekday of week.weekdays) {
        // Summarize weekly hours
        sum += weekday.hours;

        // Split weekday content for word document
        weekday.contents = weekday.content.split('\n');

      }
      var days = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
      for (let d = 0; d < days.length; d++) {
        week['h' + days[d]] = week.weekdays[d].hours;
        for (let i = 1; i < 9; i++)
          week['content' + days[d] + i] = week.weekdays[d].contents[i - 1] ? week.weekdays[d].contents[i - 1] : '';
      }

      week.hSum = sum.toString();
      this.exportToDocx(week);
    })
  }

  private exportToDocx(week: Week) {
    JSZipUtils.getBinaryContent("assets/word/VorlageGeneric.docx", function (error, content) {
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