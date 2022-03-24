import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppraisalService {
  public baseUrl = environment.apiUrlAppraisal;

  constructor(private http: HttpClient) {}

  postCycle(params: any) {
    const param = params;

    return this.http.post(this.baseUrl + '/v1/appraisalCycle', null, {
      params: param,
    });
  }
  postParameter(params: any, parameter: any) {
    const param = params;

    return this.http.post(this.baseUrl + '/v1/appraisalParameter', parameter, {
      params: param,
    });
  }

  getAppraisalCycle(): Observable<any> {
    return this.http.get(this.baseUrl + 'v1/appraisalCycle');
  }

  postAppraisalSettings(id: any, body: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('appraisalCycleId', id);
    return this.http.post(this.baseUrl + 'v1/appraisal-team-dates', body, {
      params: params,
    });
  }

  getAllParameters(){
    return this.http.get(this.baseUrl + 'v1/appraisalParameter')
  }
}
