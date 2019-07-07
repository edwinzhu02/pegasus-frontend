import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConflictCheckService {
  baseUrl: any = environment.baseUrl;
constructor( private http:HttpClient) { }

getConflictInfo():any{
  return this.http.get(this.baseUrl + 'LessonConflictCheck');
}

}
