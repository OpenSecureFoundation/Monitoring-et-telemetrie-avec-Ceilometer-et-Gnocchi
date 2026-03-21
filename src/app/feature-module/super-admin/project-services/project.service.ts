import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get<any>(`${environment.url}/projects`);
  }

  getProject(projectId: string): Observable<any> {
    return this.http.get<any>(
      `${environment.url}/projects/${projectId}/overview`,
    );
  }
}
