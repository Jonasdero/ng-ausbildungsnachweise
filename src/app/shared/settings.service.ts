import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings;
  path = 'assets/settings.json';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  constructor(private http: HttpClient) { }

  getSettings(): Observable<Settings> {
    this.http.get<Settings>(this.path).subscribe((s) => {
      this.settings = s;
    });
    return this.http.get<Settings>(this.path);
  }

  saveSettings(settings: Settings): void {
    var sJson = JSON.stringify(settings);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "settings.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }
}
