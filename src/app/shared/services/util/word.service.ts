import { Injectable } from '@angular/core';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

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
        this.exportToDocx(week, settings);
      }, 250 * index);
    });
  }

  private exportToDocx(week: Week, settings: Settings) {
    PizZipUtils.getBinaryContent('assets/word/' + settings.template + '.docx', (error: Error, content: string) => {
      if (error) { throw error; }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

      try {
        doc.render(week);
      } catch (err: any) {
        console.error(JSON.stringify({
          error: {
            message: err.message,
            name: err.name,
            stack: err.stack,
            properties: err.properties
          }
        }));
        throw err;
      }
      const out = (doc.getZip() as any).generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      const filename = week.nr.toString().padStart(3, '0') + '_' + week.startDate + '.docx';
      saveAs(out, filename);
    });
  }
}