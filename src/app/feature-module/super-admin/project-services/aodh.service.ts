import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({ providedIn: 'root' })
export class AodhService {
  constructor(private http: HttpClient) {}

  getAlerts(): Observable<any> {
    return this.http.get<any>(`${environment.url}/alarms`);
  }
}
