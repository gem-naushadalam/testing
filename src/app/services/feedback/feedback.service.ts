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
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  public user : SocialUser;
  public baseUrl = environment.apiUrlFeedback;
  constructor(private http: HttpClient) {
    this.user = JSON.parse(`${localStorage.getItem('user')}`) as SocialUser;
  }

  // Get Feedback
  getFeedback(isAcknowledged: boolean, userId: Number) {
    let params = new HttpParams();
    let header =  new HttpHeaders();
    header = header.set('x-auth-token',this.user.idToken);
    params = params.set('isAcknowledged', `${isAcknowledged}`);
    params = params.set('userId', `${userId}`);
    console.log(params);
    return this.http.get(this.baseUrl + 'user-feedback', { params, headers:header });
  }

  // Add Feedback
  addFeedback(data: any) {
    const params = new HttpParams({
      fromObject: data,
    });
    let header =  new HttpHeaders();
    header = header.set('x-auth-token',this.user.idToken);
    return this.http.post(this.baseUrl + 'user-feedback', null, { params,headers:header });
  }
}
