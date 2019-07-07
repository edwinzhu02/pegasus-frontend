import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MessagerService {
  public baseUrl: any = environment.baseUrl;
  public subsOfStaffs;
  public subsOfTeachers;
  public subsOfStudents;
  public errorFlag: boolean;

  constructor(private http: HttpClient) { 
    console.log('service')
  }

  //目前不同的权限调用的api不同 后台在改 到时候可以直接调用同一个api 后台进行判断 未完成
  getSubscribersList(userId) {
    //To avoid dulplicated data transfer, when the web initiate, call api from server(refresh, render or re-render don't call api)
    if(sessionStorage.chattingInit == 'true'){
      return;
    }
    else{ 
      this.http.get(this.baseUrl + 'Chat/GetStaffChattingList/' + userId).subscribe(
        (res) => {
          let subsStr =  JSON.stringify(res['Data']);
          //store the subscirbers list in session storage
          sessionStorage.setItem('subscribers',subsStr);
          //set 'true' as a sign
          sessionStorage.setItem('chattingInit', 'true');
        },
        (err) => {
          //console.log(err)
          this.errorFlag = true;
        }
      ) 
    }
  }

  /*
    return the subscribers stored in local session storage,
      -->为了代码整洁 把从sessionStorage里面获取数据放在了service里面
  */
  getSubscribers(){
    return JSON.parse(sessionStorage.getItem('subscribers'));
  }

  /*
    save the subscriber's object now chatting in session storage 
  */
  saveSubscriberChattingWith(subscriber){
    let subscriberStr = JSON.stringify(subscriber);
    sessionStorage.setItem('subscriberChattingWith',subscriberStr);
    this.saveRecentSubscribers(subscriber);
  }

  /*
    get the subscriber's now chatting Object from session storage
  */
  getSubscriberChattingWith(){
    let subscriberObj = sessionStorage.getItem('subscriberChattingWith')? JSON.parse(sessionStorage.getItem('subscriberChattingWith')):null;
    return subscriberObj;
  }

  /*
    save the recent subscribers in session storage
  */
  saveRecentSubscribers(subscriberObj){
    console.log(subscriberObj)
    //sessionStorage.setItem
    let obj:object = {};
    obj[subscriberObj.userId] = subscriberObj;
    console.log(obj)
  }

  /*
    save custom personl theme in local storage
  */
  saveCustomizedTheme(theme){
    localStorage.setItem('themeIndex', theme);
  }

  /*
    get custom personl theme in local storage
  */
  getCustomizedTheme(){
    return localStorage.getItem('themeIndex');
  }
}
