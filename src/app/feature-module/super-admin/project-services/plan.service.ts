import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Options } from '@angular-slider/ngx-slider';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  constructor(private http: HttpClient) {}

  getPlans(): Observable<any> {
    // TODO: Implement API call
    return this.http.get<any>(`${environment.url}/plan/list`);
  }

  getPlan(id: string): Observable<any> {
    // TODO: Implement API call
    return this.http.get<any>(`${environment.url}/plan/${id}/details`);
  }

  createPlan(payload: any): Observable<any> {
    console.log('paload dans le service:', payload);
    return this.http.post<any>(`${environment.url}/plan/create`, payload);
  }

  deletePlan(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.url}/plan/${id}`);
  }

  changePlanStatus(planId: string, active: boolean): Observable<any> {
    return this.http.patch<any>(`${environment.url}/plan/status`, {
      planId,
      active,
    });
  }

  updatePlan(planId: string, payload: any): Observable<any> {
    return this.http.put<any>(`${environment.url}/plan/update`, {
      planId,
      payload,
    });
  }

  getAvailableMetrics(id: string, options?: { skipSpinner?: boolean }) {
    const headers = options?.skipSpinner
      ? new HttpHeaders({ 'X-Skip-Spinner': 'true' })
      : new HttpHeaders();

    return this.http.get<any>(
      `${environment.url}/plan/${id}/available-metrics`,
      {
        headers,
      },
    );
  }

  addMetricPrice(
    id: string,
    payload: { billableMetricId: string; price: number },
    options?: { skipSpinner?: boolean },
  ): Observable<any> {
    const headers = options?.skipSpinner
      ? new HttpHeaders({ 'X-Skip-Spinner': 'true' })
      : new HttpHeaders();

    return this.http.post<any>(
      `${environment.url}/plan/${id}/metrics`,
      payload,
      {
        headers,
      },
    );
  }
}
