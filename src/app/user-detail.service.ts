import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetail } from './models/UserDetail';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  // tslint:disable-next-line:variable-name
  private _url = 'http://192.168.178.76:5000/api/getrole';
  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) { }

  getUserDetail(usrAndPass): Observable<any> {
    return this._http.post<UserDetail>(this._url, usrAndPass);
  }
}

export class LearnersListService {
  private _url: string = 'http://192.168.178.76:5000/api/';

  constructor(private http: HttpClient) {}

  getLearners(name): Observable<any[]>{
    return this.http.get<any[]>(this._url + 'learner/' + name);
  }
  getInvoice(id): Observable<any[]>{
    return this.http.get<any[]>(this._url + 'payment/invoice/' + id)
  }
  addFund(fund){
    return this.http.post(this._url + 'payment/payInvoice', fund, {responseType: 'text'});
  }

}
