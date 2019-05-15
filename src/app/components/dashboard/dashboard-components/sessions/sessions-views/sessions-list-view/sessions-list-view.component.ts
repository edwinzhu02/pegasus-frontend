import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbootstraptableService } from 'src/app/services/others/ngbootstraptable.service';
import { SessionsService } from '../../../../../../services/http/sessions.service';
import { PaymentService } from 'src/app/services/http/payment.service';
import { TeachersService } from 'src/app/services/http/teachers.service';
import { SessionDetailEditModalComponent } from '../../session-modals/session-detail-edit-modal/session-detail-edit-modal.component';

@Component({
  selector: 'app-sessions-list-view',
  templateUrl: './sessions-list-view.component.html',
  styleUrls: ['./sessions-list-view.component.css']
})
export class SessionsListViewComponent implements OnInit {
  public learnerList: any;
  public learnerListLength: number;
  public temLearnerList: any; //save the original teacherList
  public temLearnerListLength: number; //save the original teacherList length
  public page: number = 1;  //pagination current page
  public pageSize: number = 10;    //[can modify] pagination page size
  //error alert
  public errorMsg;
  public errorAlert = false;
  public errMsgM;
  public errMsgO;
  public confirmButton = false;
  public cancelButton = false;
  public date = '2019-04-29';
  public titleArray = [
    '#',
    'Teacher',
    'Learner',
    'Course Name',
    'Trial Course',
    'Begin Time',
    'End Time',
    'Room',
    'Branch',
    'Canceled',
    'Canceled Reason',

  ];
  constructor(
    private modalService: NgbModal,
    private ngTable: NgbootstraptableService,
    private sessionsService: SessionsService,
    private paymentService: PaymentService,
    ) { }

  ngOnInit() {
    this.getData();
  }

  // modal method
  openE(){
    const modalRef = this.modalService.open(SessionDetailEditModalComponent, { size: 'lg' });
  }
  openC(c){
    this.modalService
    .open(c)
    .result.then(
      result => {
        this.paymentService.emailInvoice(1).subscribe(
          response => {
            console.log('Success!', response);
            alert('Your Payment Has Been Made');
          },
          (error) => {
            this.errorMsg = JSON.parse(error.error);
            this.errorAlert = true;
            console.log('Error!', this.errorMsg.ErrorCode);
            alert(this.errorMsg.ErrorCode);
          }
        );
      });
  }
  openCon(confirmModal,j) {
    if (j===1){
      this.confirmButton=false;
      this.cancelButton=false;
      this.confirmButton=true;
      this.openC(confirmModal);
    } else {
      this.confirmButton=false;
      this.cancelButton=false;
      this.cancelButton = true;
      this.openC(confirmModal);
    }
  }

  // get data from server side
  getData() {
    this.sessionsService.getReceptionistLesson(this.date).subscribe(
      (res) => {
        console.log(res)
        this.learnerList = res.Data;
        this.learnerListLength = res.Data.length; //length prop is under Data prop
        this.temLearnerList = res.Data;
        this.temLearnerListLength = res.Data.length;
      },
      error => {
        this.errorMsg = JSON.parse(error.error);
        console.log("Error!", this.errorMsg.ErrorCode);
        this.errorAlert = false;
      });
  }

  // sort name
  onSort(orderBy) {
    this.ngTable.sorting(this.learnerList, orderBy);
  }
  // search name
  onSearch(event){
    // should init original list and length
    this.learnerList = this.temLearnerList;
    this.learnerListLength = this.temLearnerListLength;

    let searchStr = event.target.value;
    //
    let titlesToSearch = 'FirstName';

    this.learnerList = this.ngTable.searching(this.learnerList,titlesToSearch,searchStr);
    this.learnerListLength = this.learnerList.length;
  }
}
