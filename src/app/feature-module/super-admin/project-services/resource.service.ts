import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Interval } from '../models/interval.model';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ResourceService {
  constructor(private http: HttpClient) {}

  getResource(
    projectId: string,
    instanceId: string,
    resourceType: string,
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.url}/project/${projectId}/instance/${instanceId}/overview`,
      { resourceType: resourceType },
    );
  }

  getMetric(
    projectId: string,
    instanceId: string,
    range: { from: number; to: number; granularity: number },
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.url}/project/${projectId}/instance/${instanceId}/metrics`,
      range,
    );
  }

  getAlarms(projectId: string, resourceId: string): Observable<any> {
    return this.http.get<any>(
      `${environment.url}/project/${projectId}/resource/${resourceId}/alarms`,
    );
  }

  getPorts(projectId: string, instanceId: string): Observable<any> {
    return this.http.get<any>(
      `${environment.url}/project/${projectId}/instance/${instanceId}/port`,
    );
  }

  getTrafic(
    projectId: string,
    instanceId: string,
    interval: any,
  ): Observable<any> {
    console.log('interval: ', interval);
    return this.http.post<any>(
      `${environment.url}/project/${projectId}/net-inst/${instanceId}/metrics`,
      interval,
    );
  }

  buildRecentMetricsWindow() {
    const now = Date.now();
    // 2 minutes en millisecondes
    const ingestionDelay = 2 * 60 * 1000;
    // 4 heures en millisecondes
    const windowSize = 4 * 60 * 60 * 1000;
    const to = now - ingestionDelay;
    const from = to - windowSize;
    return {
      from,
      to,
    };
  }

  getInstanceAlarms(projectId: string, instanceId: string): Observable<any> {
    return this.http.get<any>(
      `${environment.url}/project/${projectId}/instance/${instanceId}/alarms`,
    );
  }

  createAlarm(projectId: string, payload: any): Observable<any> {
    return this.http.post(
      `${environment.url}/project/${projectId}/create/alarm`,
      payload,
    );
  }
}
