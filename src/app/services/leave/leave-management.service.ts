import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})

export class LeaveManagementService {
  public baseUrl = environment.apiUrlLeave;
  constructor(private http: HttpClient) { }

  getLeaveBalanceData() {
    const userId :any = localStorage.getItem('userId')
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get(this.baseUrl + `leaves/balance/`, { params: params });
  }

  postLeave(body: object) {
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + `leaves/application`, body, { headers: headers });

  }
  getleave() {
    const userId :any = localStorage.getItem('userId')
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('isWFH', 'false');
    return this.http.get(this.baseUrl + `leaves/application/`, { params: params });

  }
  getreviewleave() {
    const userId :any = localStorage.getItem('userId')
    let params = new HttpParams();
    params = params.append('approverId', userId);
    params = params.append('isWFH', 'false');
    return this.http.get(this.baseUrl + `leaves/application/`, { params: params });

  }
  getCoff() {
    const userId :any = localStorage.getItem('userId')
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get(this.baseUrl + `comp-off`, { params: params });

  }
  postLnsa(body: object) {
    
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + `lnsa`, body, { headers: headers });

  }
  getlnsa() {
    const userId :any = localStorage.getItem('userId')
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get(this.baseUrl + `lnsa`, { params: params });

  }

  deletelnsa(params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    return this.http.delete(this.baseUrl + 'lnsa', {
      params: param,
      headers: headers,
    });
  }
  deleteleave(params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    return this.http.delete(this.baseUrl + 'leaves/application', {
      params: param,
      headers: headers,
    });

  }
  patchleave(params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    return this.http.patch(this.baseUrl + 'leaves/application/status-update', null, {
      params: param,
      headers: headers,
    });

  }
  patchoutDuty(params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    return this.http.patch(this.baseUrl + 'outing', null, {
      params: param,
      headers: headers,
    });

  }
  patchlnsa(params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    return this.http.patch(this.baseUrl + 'lnsa/approver-response', null, {
      params: param,
      headers: headers,
    });

  }
  patchCoff(params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    return this.http.patch(this.baseUrl + 'comp-off', null, {
      params: param,
      headers: headers,
    });

  }
  deleteoutDuty(params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    return this.http.delete(this.baseUrl + 'outing', {
      params: param,
      headers: headers,
    });

  }

  postCoff(params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    return this.http.post(this.baseUrl + `comp-off`, null, {
      params: param, headers: headers
    });


  }
  getWFH() {
    const userId :any = localStorage.getItem('userId')
    let params = new HttpParams();
    params = params.append('isWFH', 'true');
    params = params.append('userId', userId);
    return this.http.get(this.baseUrl + `leaves/application/`, { params: params });

  }
  getreviewWFH() {
    const userId :any = localStorage.getItem('userId')
    let params = new HttpParams();
    params = params.append('isWFH', 'true');
    params = params.append('approverId', userId);
    return this.http.get(this.baseUrl + `leaves/application/`, { params: params });

  }
  getreviewCompOff() {
    const userId :any = localStorage.getItem('userId')
    let params = new HttpParams();
    params = params.append('approverId', userId);
    return this.http.get(this.baseUrl + `leaves/application/`, { params: params });

  }
  getreviewOutduty() {
    const userId :any = localStorage.getItem('userId')
    let params = new HttpParams();
    params = params.append('approverId', userId);
    return this.http.get(this.baseUrl + `leaves/application/`, { params: params });

  }
  getreviewLnsa() {
    const userId :any = localStorage.getItem('userId')
    let params = new HttpParams();
    params = params.append('approverId', userId);
    return this.http.get(this.baseUrl + `leaves/application/`, { params: params });

  }
  postoutDuty(body: any) {
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + `outing`, body, { headers: headers });

  }
  getoutDuty() {
    const userId :any = localStorage.getItem('userId')
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get(this.baseUrl + `outing`, { params: params });

  }

}
