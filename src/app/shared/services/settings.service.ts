import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings;
  path = 'assets/settings.json';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  constructor(private http: HttpClient) { }

  getSettings(): Observable<Settings> {
    if (this.settings) return of(this.settings);
    this.http.get<Settings>(this.path).subscribe((s) => {
      this.settings = s;
    });
    return this.http.get<Settings>(this.path);
  }
  saveSettings(settings: Settings): void { this.settings = settings; }
}