import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectModuleService {
  public baseUrl = environment.apiUrlProjectModule;

  constructor(private http: HttpClient) {}

  getVerticals() {
    return this.http.get(this.baseUrl + `/vertical`);
  }

  getProject(params: any): Observable<any> {
    // const params = params;
    return this.http.get(this.baseUrl + 'projects', { params });
    // .pipe(catchError(this.errorHandler));
  }
  getTeamMember(params: any): Observable<any> {
    return this.http.get(this.baseUrl + 'projects/team-members', { params });
  }

  deleteTeamMember(params: any) {
    const param = params;
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    return this.http.delete(this.baseUrl + 'projects/team-members', {
      params: param,
      headers: headers,
    });
  }
  addVertical(body: any) {
    return this.http.post(this.baseUrl + `/vertical`, body);
  }
  getAllRoles() {
    return this.http.get(this.baseUrl + 'project-team-member/roles');
  }

  getAllTasks() {
    return this.http.get(this.baseUrl + 'project-team-members/tasks');
  }
  getAllIndustries() {
    return this.http.get(this.baseUrl + 'industry');
  }

  getVerticalName(id: any) {
    let params = new HttpParams();
    params = params.set('verticalId', id);
    return this.http.get(this.baseUrl + 'vertical', { params });
  }

  addNewProject(body: any, industryId: any, verticalId: any) {
    let params = new HttpParams();
    params = params.set('industryId', industryId);
    params = params.set('verticalId', verticalId);

    return this.http.post(this.baseUrl + 'projects', body, { params });
  }
  addMembers(body: any) {
    return this.http.post(this.baseUrl + 'projects/team-members', body);
  }
  addNewIndustry(params : any){
    const param = params;
   return this.http.post(this.baseUrl + '/industry', null, {params:param});
  }

  updateMember(body: any, teamMemberId: any) {
    let params = new HttpParams();
    params = params.set('teamMemberId', teamMemberId);
    return this.http.put(this.baseUrl + 'projects/team-members', body, {
      params,
    });
  }
}
