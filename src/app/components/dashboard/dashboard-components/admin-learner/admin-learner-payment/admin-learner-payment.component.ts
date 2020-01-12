import { Component, OnInit } from '@angular/core';

import { NgbootstraptableService } from 'src/app/services/others/ngbootstraptable.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TransactionService } from "../../../../../services/http/transaction.service";
import { CoursesService } from "../../../../../services/http/courses.service";
import { AdminSendPaymentEmailComponent } from '../admin-send-payment-email/admin-send-payment-email.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-learner-payment',
  templateUrl: './admin-learner-payment.component.html',
  styleUrls: ['./admin-learner-payment.component.css']
})
export class AdminLearnerPaymentComponent implements OnInit {

  private columnsToShow: Array<string> = ['Name', 'status', 'select'];

  private learnerInvoList: Array<any>; 
  private learnerInvoListCopy: Array<any>;   
  private learnerInvoListLength: number;  

  private termId: number;

  private loadingFlag: boolean;

  private paymentStatus=-1

  private payments=[{id:Number(0), name:"not paid"}, {id:Number(1), name:"paid"}];

  private checkboxModel = [];
  private selectAll = false;


  constructor(
    private ngTable: NgbootstraptableService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private transactionService: TransactionService,
    private coursesService: CoursesService
  ) { }

  ngOnInit() {
    this.loadingFlag = true;
    this.getTerm();    
  }

  //get data from server
  getDataFromServer() {
    // this.isLoad = true;
    this.transactionService.getLearnerInvo(localStorage.getItem("userID"), this.termId).subscribe(
      res => {
        this.learnerInvoList = res.Data;
        this.learnerInvoListLength = res.Data.length; // length prop is under Data prop

        this.learnerInvoListCopy = this.learnerInvoList;
        this.loadingFlag = false;
      },
      error => {
        this.loadingFlag = false;

        console.log("Error!", JSON.parse(error.error));

        Swal.fire({
          type: "error",
          title: "Oops...",
          text: error.error.ErrorMessage
        });
      }
    );
  }

  checkSelectAllClick()
  {
    if(true === this.selectAll)
    {
      for(let i=0; i<this.learnerInvoListLength; i++){
        this.checkboxModel[i] = false;
      }
    }
    else{
      for(let i=0; i<this.learnerInvoListLength; i++){
        this.checkboxModel[i] = true;
      }
    } 
  }

  checkClick(index){

  }

  sendEmail(){

    const modalRef = this.modalService.open(AdminSendPaymentEmailComponent, { size: 'lg',  centered: true, windowClass: 'my-class', backdrop: 'static', keyboard: false });

    let that = this;
    modalRef.result.then(
      (res) => {
        that.ngOnInit()
      },
      (err) => {
        return
      }
    )
    // modalRef.componentInstance.command = command;
    modalRef.componentInstance.learnlist = this.learnerInvoList;
    modalRef.componentInstance.selectArray = this.checkboxModel;    

    modalRef.componentInstance.signalForInit.subscribe(res => {
      if (res == true) {
        that.ngOnInit();
      }
    });
  }

onChange(learners)
{
  this.selectAll = false;
  for(let i=0; i<this.learnerInvoListLength; i++){
    this.checkboxModel[i] = false;
  }

  learners = this.learnerInvoListCopy;
  if(0 == this.paymentStatus){
    this.learnerInvoList = learners.filter(learner => {
      if (learner.Invoice.IsPaid==0)
        return true;
    });
  }
  else if(1 == this.paymentStatus){
    this.learnerInvoList = learners.filter(learner => {
      if (learner.Invoice.IsPaid==1)
        return true;
    });
  }
  else if(-1 == this.paymentStatus){
    this.learnerInvoList = this.learnerInvoListCopy;
  }
}


  getTerm() {
    const today = new Date();
    this.coursesService.getoioi().subscribe(
      res => {
        // this.terms = res.Data;
        for (const e of res.Data) {
          this.termId = e["TermId"];
          if (
            today >= new Date(e["BeginDate"]) &&
            today <= new Date(e["EndDate"])
          ) {
            break;
          }
        }
        // this.getData();
        this.getDataFromServer();
      },
      error => {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: error.error.ErrorMessage
        });
      }
    );
  }

    /*
     Insert space before capital letter.
       eg: FirstName --> First Name
   */
  AddSpaceInString(strToAdd) {
    return strToAdd.replace(/(?=[A-Z])/g, ' ');
  }
}
