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
    for (let i = 0; i < weeks.length; i++) {
      this.improveWeek(weeks[i], i);
    }
  }

  private improveWeek(week: Week, index: number) {
    this.settingsService.getSettings().subscribe(settings => {
      week.nr = this.dateService.getNumber(week.date);
      week.year = this.dateService.getYear(week.date);

      week.startDate = this.dateService.getLocaleDateString(week.date);
      week.endDate = this.dateService.getLocaleDateString(this.dateService.getFriday(week.date));

      week.beruf = settings.beruf;
      week.name = settings.nachname;
      week.surname = settings.vorname;
      let sum = 0;
      for (const weekday of week.weekdays) {
        // Summarize weekly hours
        sum += weekday.hours;

        // Split weekday content for word document
        weekday.contents = weekday.content.split('\n');

      }
      const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
      for (let d = 0; d < days.length; d++) {
        week['h' + days[d]] = week.weekdays[d].hours;
        for (let i = 1; i < 9; i++) {
          week['content' + days[d] + i] = week.weekdays[d].contents[i - 1] ? week.weekdays[d].contents[i - 1] : '';
        }
      }

      week.hSum = sum.toString();
      setTimeout(() => {
        this.exportToDocx(week);
      }, 250 * index);
    });
  }

  private exportToDocx(week: Week) {
    JSZipUtils.getBinaryContent('assets/word/VorlageGeneric.docx', function (error, content) {
      if (error) { throw error; }
      const doc = new Docxtemplater().loadZip(new JSZip(content));
      doc.setData(week);

      try { doc.render(); }
      catch (error) {
        console.log(JSON.stringify({
          error: {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          }
        }));
        throw error;
      }
      const out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      const filename = week.nr.toString().padStart(3, '0') + '_' + week.startDate + '.docx';
      FileSaver.saveAs(out, filename);
    });
  }
}