import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbootstraptableService } from 'src/app/services/others/ngbootstraptable.service';
import { LearnersService } from '../../../../../services/http/learners.service';
import { TeachersService } from '../../../../../services/http/teachers.service';
import { AdminInvoiceEditModalComponent } from '../admin-invoice-edit-modal/admin-invoice-edit-modal.component';

@Component({
  selector: 'app-admin-invoice-list',
  templateUrl: './admin-invoice-list.component.html',
  styleUrls: ['./admin-invoice-list.component.css']
})
export class AdminInvoiceListComponent implements OnInit {
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
  constructor(
    private modalService: NgbModal,
    private ngTable: NgbootstraptableService,
    // private learnersservice: LearnersService,
    private teachersService: TeachersService
    ) { }

  ngOnInit() {
    this.getData();
  }

  // modal method
  open(){
    const modalRef = this.modalService.open(AdminInvoiceEditModalComponent, { size: 'lg' });
  }

  // get data from server side
  getData() {
    this.teachersService.getTeachersInfo().subscribe(
      (res) => {
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
    let titlesToSearch = ['FirstName','LastName'];

    this.learnerList = this.ngTable.searching(this.learnerList,titlesToSearch,searchStr);
    this.learnerListLength = this.learnerList.length;
  }
}