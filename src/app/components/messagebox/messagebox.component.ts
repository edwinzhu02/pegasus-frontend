import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BoardmodelComponent } from 'src/app/components/messgeboard/boardmodel/boardmodel.component';
import { SessionsService } from 'src/app/services/http/sessions.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})

export class MessageboxComponent implements OnInit {
  orgId = [];
  isloading = false;
  beginDate = this.datePipe.
    transform(new Date(new Date().getFullYear(), new Date().getMonth() - 2, new Date().getDate()), 'yyyy-MM-dd');
  endDate = this.datePipe.
    transform(new Date(new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate()), 'yyyy-MM-dd');
  lessonMessageData;
  SessionListLength: number;
  public page = 1;  // pagination current page
  public pageSize = 10;    // [can modify] pagination page size
  public errorMsg;
  public errorAlert = false;
  public titleArray = [
    '#',
    'Teacher',
    'Learner',
    'Course ID & Name',
    'Lesson Begin Time',
    'Lesson End Time',
    'Latest Update'
  ];

  constructor(
    private modalService: NgbModal,
    private sessionsService: SessionsService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.orgId = JSON.parse(localStorage.getItem('OrgId'));
    this.getData(this.orgId, this.beginDate, this.endDate);

  }

  getData(org, begin, end) {
    this.isloading = true;
    //so far only get one branch lessonmsgs for each user

    this.sessionsService.getLessonMsgs(org[0], begin, end).subscribe(
      (res) => {
        this.isloading = false;
        this.lessonMessageData = res.Data;
        this.SessionListLength = res.Data.length;
        console.log(this.lessonMessageData)

        for (let i of this.lessonMessageData) {
          this.sessionsService.getMsgs(i.LessonId).subscribe(res => {
            console.log(res);
          });

        }
      },
      error => {
        alert('Server Error')
        this.isloading = false;
      });

  }

  searchByDate(){
    const searchBeginDate = this.beginDate == null ? alert('please enter begin date') :
      this.datePipe.transform(this.beginDate, 'yyyy-MM-dd');
    const searchEndDate = this.endDate == null ? alert('please enter end date') :
      this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    if (searchBeginDate == null || searchEndDate == null) {
      return;
    }
    this.getData(this.orgId,searchBeginDate, searchEndDate);
  }


  gotoMessage = (lessonId) => {
    // this.router.navigate(['Messgeboard', {id: "1"}]);
    // window.open(environment.photoUrl+"Messgeboard"); 
    const modalRef = this.modalService.open(BoardmodelComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false
    });
    modalRef.componentInstance.params = {
      id: localStorage.getItem("staffId"),
      role: 5,
      lessonId: lessonId,
    };
  }

}
