import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  path = 'assets/settings.json';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  constructor(private http: HttpClient) { }

  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(this.path);
  }

  saveSettings(settings: Settings): void {
    //TODOSS
  }

  getAusbildungsjahr(d: Date): number {
    return 1;
  }
}
