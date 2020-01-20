import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimePickerService {
  baseUrl: any = environment.baseUrl;
  httpHeaders: HttpHeaders;
  
  constructor(private http: HttpClient) { }

  getTeacherAvailableCheck(teacherId: number, startDate: any): Observable<any>{
    return this.http.get(this.baseUrl + `TeacherAvailableCheck/${teacherId}/${startDate}`) 
  }
  getTeacherByOrg(orgId,dayofweek){
    return this.http.get(this.baseUrl + `Teacher/GetTeacherByOrgDayOfWeek/${orgId}/${dayofweek}`) 
  }
  GetOrgTeacherAvailableCheck(orgId,dayofweek){
    return this.http.get(this.baseUrl + `TeacherAvailableCheck/GetOrgTeacher/${orgId}/${dayofweek}`)  
  }
}
