import { NativeDateAdapter } from "@angular/material";

export class GermanDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat != "input")
      return date.toDateString();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return this._to2digit(day) + '.' + this._to2digit(month) + '.' + year;
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}