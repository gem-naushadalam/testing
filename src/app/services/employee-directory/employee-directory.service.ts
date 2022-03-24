import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDirectoryService {
  public baseUrl = environment.apiUrlEmployeeDirectory;
  public employeesData : any;
  constructor(private http: HttpClient) {
    this.http.get(this.baseUrl + 'employee-directory/users').subscribe((data: any) =>{
      this.employeesData = data.object;
    })
  }

  // Get Employee Details
  getEmployeeDetails(): Observable<any> {
    return this.http.get(this.baseUrl + 'employee-directory/users');
  }

  getEmployeesData(){
    return this.employeesData;
  }
  getEmployeeDetailsByuserId(userId: any) {
    return this.http.get(
      this.baseUrl + 'employee-directory/user/' + userId
    );
  }
  getEmployeeDetailsBymailId(mailId: any) {
    let params = new HttpParams();
    params = params.set('email',mailId);
    return this.http.get(
      this.baseUrl + 'employee-directory/user/' , {params:params}
    );
  }

  getEmployeeDetailsByGraphQl() {
    const body =
      '{employees{empId, employeeCode, email, designation{designationName}, employeeName, contactNo, extensionNo, profileImagePath, reportingManager, location, team{department{departmentName}}}}';
    return this.http.post(this.baseUrl + 'graphql/employees', body);
  }
  getEmployeeDetailsBymail(mail:any){
    // this.mail = mail;

    const body = `{employee(email:"${mail}"){EmployeeId, employeeName, profileImagePath, designation{designationName}}}`
    
    return this.http.post(this.baseUrl + 'graphql/designations',body)

  }

  getDepartmentsByGraphQl() {
    const body = `{departments {departmentName, teams{teamId,teamName}}}`;
    return this.http.post(this.baseUrl + 'graphql/departments', body);
  }

  // getDesignationByGraphQl() {
  //   const body = `{designations{designationName}}`;
  //   return this.http.post(this.baseUrl + 'v1/graphql/departments', body);
  // }
}
