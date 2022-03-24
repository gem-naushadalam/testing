import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';

//For Catch
import { catchError } from 'rxjs/operators';

//for throw:
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  static getPolicies() {
    throw new Error('Method not implemented.');
  }
  public baseUrl = environment.apiUrlPolicy;
  constructor(private http: HttpClient) {}

  getPolicies(isUser: boolean): Observable<any> {
    const params = new HttpParams().set('users', `${isUser}`);
    return this.http
      .get(this.baseUrl + 'policy', { params })
      .pipe(catchError(this.errorHandler));
  }

  getPolicyPdf(params: any): Observable<any> {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/pdf');
    return this.http.get(this.baseUrl + 'policy/get-policy', {
      params: param,
      headers: headers,
      responseType: 'blob',
    });
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError('Oops, unable to get data from Server' || 'Server Error');
  }

  addPolicy(formData: any, params: any) {
    const addParam = params;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('accept', 'application/json');
    return this.http.post(this.baseUrl + 'policy', formData, {
      params: addParam,
      headers: headers,
    });
  }

  patchstate(params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    return this.http.patch(this.baseUrl + 'policy', null, {
      params: param,
      headers: headers,
    });
  }

  deleteform(params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    return this.http.delete(this.baseUrl + 'policy', {
      params: param,
      headers: headers,
    });
  }

  updatePolicyName(params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    return this.http.patch(this.baseUrl + 'policy/update', null, {
      params: param,
      headers: headers,
    });
  }
}
