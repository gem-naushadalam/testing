import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
 
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private http: HttpClient) {}
  public baseUrl = environment.apiUrlPolicy;

  getForms(isHr: boolean): Observable<any> {
    const params = new HttpParams().set('users', `${isHr}`);
    return this.http
      .get(this.baseUrl + 'forms', { params })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError('Oops, unable to get data from Server' || 'Server Error');
  }

  postform(formData: any, params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('accept', 'application/json');

    return this.http.post(this.baseUrl + 'forms', formData, {
      params: param,
      headers: headers,
    });
  }

  patchstate(params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    return this.http.patch(this.baseUrl + 'forms', null, {
      params: param,
      headers: headers,
    });
  }

  deleteform(params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    return this.http.delete(this.baseUrl + 'forms', {
      params: param,
      headers: headers,
    });
  }
  downloadFile(params:any):Observable<Blob>{
    const param = params;
  
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');   
    return this.http.get(this.baseUrl + 'forms/get-form',{params:param , headers:headers,responseType: 'blob'});
  }
  viewFile(params:any):Observable<Blob>{
    const param = params;
  
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');   
    return this.http.get(this.baseUrl + 'forms/get-form',{params:param 
      , headers:headers,
      responseType: 'blob'});
  }
  updateFormName(params :any){
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    return this.http.patch(this.baseUrl + 'forms/update', null, {
      params: param,
      headers: headers,
    });

  }

}
