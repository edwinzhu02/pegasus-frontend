import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/http/users.service';
import { GeneralRepoService } from './../../../../../services/repositories/general-repo.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashboardService } from "src/app/services/http/dashboard.service";
import { element } from '@angular/core/src/render3';
import { RelativeTimePipe } from '../../../../../shared/pipes/relative-time.pipe';
// import Router


@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.css']
})
export class NotificationPopupComponent implements OnInit {
  // get closeNotification from headerbar component, for displaying notification popup or not
  @Input() closeNotification: boolean;
  // send sth to headerbar component, show msg number in real time 
  @Output() sendMsgNumber = new EventEmitter<number>()
  @Output() sendIsCleared = new EventEmitter<boolean>()

  // for server side
  public staffId: number;
  // for rendering
  public messages: any[];
  public msgNumber: number;
  public sliceMsg: string;
  public restMsg: string;
  public openRestMsg: boolean = false;
  public isCleared: boolean = false;
  public hiddenClearBtn: boolean = true;
  public toDoList:any;
  // behavior subject to get closeNotification poperty
  public subscription: Subscription;
  GeneralRepoService
  constructor(private dashboardService: DashboardService,
    private generalRepoService: GeneralRepoService,
    private usersService:UsersService,
    private router:Router) { }

  ngOnInit() {
    this.staffId = +localStorage.getItem("staffId")
    this.getMessages(this.staffId);
    this.getTodoList();
    setInterval(() => {
      this.getMessages(this.staffId);
    }, 1000*15);
  }
  goTodoList(){
    // console.log('todoList')
    this.router.navigate(['./todoList']);
    this.closeNotification=true;
  }
  getMessages(staffId: number) {
    this.dashboardService.getMessages(staffId).subscribe(
      res => {
        this.messages = res['Data'].reverse();
        this.msgNumber = res['Data'].length;
        this.sliceMessage(res['Data'],1)
        this.generalRepoService.newNotifiNumer.next(this.msgNumber);
        if (this.messages.length === 0) {
          this.isCleared = true;
          this.hiddenClearBtn = false;
          this.sendIsCleared.emit(this.isCleared)
        }
      },
      err =>{
        // alert("Oops, something went wrong!")
        console.log(err);
      } 
    )
  }
  getTodoList(){
    this.usersService.getToDoList().subscribe(
      res=>{
        this.toDoList=res['Data']
        this.sliceMessage(res['Data'],2)

        // console.log(this.toDoList)
      },
      err=>{
        // alert("Error occur!");
        console.log(err);
      }
    )
  }

  /* handle long messages */
  sliceMessage(messages,type) {
    // console.log(messages);
    if (!messages) return;
    if (type==1)
      messages.map((obj) => {
        if (obj.Notice.length > 28) {
          this.sliceMsg = obj.Notice.slice(0, 28);
          this.restMsg = obj.Notice.slice(28);
          obj['SliceMsg'] = this.sliceMsg;
          obj['RestMsg'] = this.restMsg;
          obj['ReadMore'] = true;
        }
      })
      else
      messages.map((obj) => {
        if (obj.ListContent.length > 28) {
          this.sliceMsg = obj.ListContent.slice(0, 60);
          this.restMsg = obj.ListContent.slice(60);
          obj['SliceMsg'] = this.sliceMsg;
          obj['RestMsg'] = this.restMsg;
          obj['ReadMore'] = true;
        }
      })
    }
  readMore(i,type) {
    if (type==1)
      this.messages[i]['ReadMore'] = false;
    else
      this.toDoList[i]['ReadMore'] = false;
  }
  hiddenRestMsg(i,type) {
    if (type==1)
      this.messages[i]['ReadMore'] = true;
    else
      this.toDoList[i]['ReadMore'] = true;
  }
  /* clear btn */
  clearMsg() {
    this.isCleared = true;
    this.hiddenClearBtn = false;
    this.sendIsCleared.emit(this.isCleared)
  }
  /* when click single message */
  handleIsRead(msg) {
    this.dashboardService.putMessages(this.staffId, msg.NoticeId, 1).subscribe(
      res => {
        let index = this.messages.indexOf(msg);
        this.messages[index].IsRead = 0;
        // filter not read message, calculate its number
        let filterMsg = this.messages.filter(msg => msg.IsRead === 1)
        this.msgNumber = filterMsg.length;
        this.sendMsgNumber.emit(this.msgNumber);
        this.handleEmptyMsg();
      },
      err => {
        // alert("Oops, something went wrong!")
      }
    )
  }
  /* handle event when msg is empty */
  handleEmptyMsg() {
    if (this.messages.length === 0 || this.msgNumber === 0) {
      this.isCleared = true;
      this.hiddenClearBtn = false;
      this.sendIsCleared.emit(this.isCleared)
    }
  }
  /* prevent click event to pass data to dashboard service */
  stopCloseNotification(event) {
    event.stopPropagation();
  }
}
