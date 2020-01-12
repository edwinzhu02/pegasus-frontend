import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class PostEmailServiceService {

  baseUrl = environment.baseUrl;
  httpHeaders: HttpHeaders;
  token: string;

  constructor(private http: HttpClient) { }

  prepareHeaders(){
    this.token = localStorage.getItem("Token");
    return (this.httpHeaders = new HttpHeaders({
      Authorization: "Bear " + localStorage.getItem("Token")
    }));
  }

  postEmail(para1){

    return this.http.post(this.baseUrl + "SendMail", para1);
  }


  // http://gradspace.org:5000/api/SendMail

  // Post:(formdata)
  //   para1:Mail :string 
    
  //   {
  //     "MailTo": "edwin.zhu02@gmail.com",
  //     "MailTitle": "hello",
  //     "MailContent": "Your invoice is due, Please payment on time.",
  //     "MailToName": "edwin"
  //   }
  
  //   para2:Attachment: file	

}
