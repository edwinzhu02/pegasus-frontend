import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HolidaysService {
  baseUrl = environment.baseUrl;

constructor(private http: HttpClient) { }


getHoliday() {
  return this.http.get<any>(this.baseUrl + 'Holiday' );
}

addHoliday(data){
  return this.http.post(this.baseUrl + 'Holiday', data)
}

deleteHoliday(HolidayId){
  return this.http.delete(this.baseUrl + 'Holiday/' + HolidayId)
}
}




