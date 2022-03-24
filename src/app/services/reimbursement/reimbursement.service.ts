import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {
  public baseUrl = environment.apiUrlReimbursement;
  constructor(private http: HttpClient) {

   }
   getForm(){
     let params = new HttpParams();
     const userId: any = localStorage.getItem('userId');
     params = params.set('userId',userId);
    return this.http.get(this.baseUrl + 'reimbursement/get-for-user',{params:params});
   }
   getFormsforApproverId(){
    let params = new HttpParams();
    const userId: any = localStorage.getItem('userId');
    params = params.set('approverId','1');
   return this.http.get(this.baseUrl + 'reimbursement/get-for-approver',{params:params});
  }
   postform(formData: any, params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('accept', 'application/json');

    return this.http.post(this.baseUrl + 'reimbursement/add', formData, {
      params: param,
      headers: headers,
    });
  }
  viewFile(params:any):Observable<Blob>{
    const param = params;
  
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');   
    return this.http.get(this.baseUrl + 'reimbursement/load-file',{params:param 
      , headers:headers,
      responseType: 'blob'});
  }
}
