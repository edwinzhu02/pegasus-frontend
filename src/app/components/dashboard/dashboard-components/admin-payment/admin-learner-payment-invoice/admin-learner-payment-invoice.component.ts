import { Component, OnInit} from '@angular/core';
import { PaymentService } from '../../../../../services/http/payment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbTab, NgbTabTitle, } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ILearnerPay } from '../../../../../models/learners';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GeneralRepoService } from '../../../../../services/repositories/general-repo.service';
import * as jsPDF from 'jspdf';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-admin-learner-payment-invoice',
  templateUrl: './admin-learner-payment-invoice.component.html',
  styleUrls: ['./admin-learner-payment-invoice.component.css']
})
export class AdminLearnerPaymentInvoiceComponent implements OnInit {
  // invoice
  public dataInvoice: any;
  public learnerId: any;
  learner;
  public addFund;
  // post payment
  public postPayment: ILearnerPay;
  // tabset
  public errorMsg;
  public successAlert = false;
  public errorAlert = false;
  public errMsgM = false;
  public errMsgO = false;
  public arrayInv = [];
  public dateCurrent;
  // ng-modal variable
  closeResult: string;

  invoiceForm = this.fb.group({
    owing: ['', Validators.required],
    paymentMethodI: [, Validators.required]
  });
  get owing() {
    return this.invoiceForm.get('owing');
  }
  // paymentMethod FB
  get paymentMethodI() {
  return this.invoiceForm.get('paymentMethodI');
  }
    constructor(
    private modalService: NgbModal,
    private paymentsListService: PaymentService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private generalRepoService: GeneralRepoService,

    config: NgbTabsetConfig
  ) {
    // bootstrap tabset
    config.justify = 'center';
    config.type = 'pills';
  }


// put service method
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // In case learner have two invoice at ng-bootstrap tab
  fetchNews(event){
    console.log(event)
    if (this.dataInvoice.length > 3) {
      this.invoiceForm.patchValue({
        owing : 0
      });
    } else {
    const id = Number(event.activeId.slice(8));
    switch (id) {
      case 0:
      this.invoiceForm.patchValue({
        owing : Math.abs(this.dataInvoice[1].OwingFee)
      });
      break;
      case 1:
      this.invoiceForm.patchValue({
        owing : Math.abs(this.dataInvoice[0].OwingFee)
      });
    }
  }
  }

    // create post obj
    postPaymentMethod(item) {
      this.postPayment = {
        StaffId: 1,
        LearnerId: item.LearnerId,
        InvoiceId: item.InvoiceId,
        PaymentMethod: this.paymentMethodI.value,
        Amount: this.invoiceForm.value.owing
      };
    }

    // confirm payment open method
    openP(contentP, item) {
      this.addFund = this.invoiceForm.value.owing;
      this.modalService
        .open(contentP, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          result => {
            this.closeResult = `Closed with: ${result}`;
            this.postPaymentMethod(item);
            this.paymentsListService.addFund(this.postPayment).subscribe(
              response => {
                console.log('Success!', response);
                this.successAlert = true;
                alert('Your Payment Has Been Made');
                this.router.navigate(['../success'], {relativeTo: this.activatedRouter});
              },
              (error) => {
                this.errorMsg = JSON.parse(error.error);
                this.errorAlert = true;
                alert(this.errorMsg.ErrorCode);
              }
            );
          },
          reason => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    }
    // change payment clearing message
    changePayment(){
      this.errMsgM = false;
    }
    // valid payment method
    validMethodI(contentP, item, j) {
      if(this.invoiceForm.controls.paymentMethodI.invalid === true){
        this.errMsgM = true;
      }
      if (this.invoiceForm.value.owing <= 0 || (this.invoiceForm.value.owing > this.dataInvoice[j].OwingFee)){
        this.errMsgO = true;
      }
      if(this.errMsgM || this.errMsgO){
        return;
      }
      this.openP(contentP, item);
    //   if(this.invoiceForm.invalid || this.invoiceForm.value.owing === 0) {
    //     this.errMsgM = true;
    //     for (let i in this.invoiceForm.controls){
    //     // this.invoiceForm.controls[i].touched=true;
    //   }
    // } else {
    //   this.openP(contentP, item)
    // }
  }
    // close alert
    closeSucc(){
      this.successAlert = false;
    }
    closeErro(){
      this.errorAlert = false;
    }

    // make new search
    reSearchPrepare() {
      // in case have mutiple invoices
      this.arrayInv = [];
      this.dataInvoice.forEach((item, index) => {
        this.arrayInv.push(index); });
      this.invoiceForm.patchValue({
        owing : Math.abs(this.dataInvoice[0].OwingFee),
        paymentMethodI: null
      });
    }
    getCurrentDate(){
      let dateObj = new Date;
      let year = dateObj.getFullYear().toString();
      let month = dateObj.getMonth().toString();
      let date = dateObj.getDate().toString();
      let hour = dateObj.getHours().toString();
      let min = dateObj.getMinutes().toString();
      return this.dateCurrent = `${hour}:${min} ${date}/${month}/${year}`
    }

    // pdf medthod
    downloadPDF(j) {

      // let doc = new jsPDF();
      // let specialElementHandlers = {
      //   '#editor': function(element, renderer) {
      //     return true;
      //   }
      // };
      // let content = this.myPDFdata.first.nativeElement;
      // doc.fromHTML(content.innerHTML, 15, 15,{
      //   'width':'800',
      //   'elementHandlers': specialElementHandlers
      // })

      let invDetail = this.dataInvoice[j];
      let count = 1;
      // Landscape export, 2×4 inches
      let doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [600, 400]
      });
      // title
      doc.setFontSize(20);
      doc.text(`Able Music Studio`, 75, 10);
      // detail
      doc.setFontSize(10);
      doc.text(`Invoice To: ${this.learner.FirstName}  ${this.learner.LastName}`, 30, 30);
      doc.text(`For`, 30, 40);
      doc.text(`${invDetail.LessonQuantity} Lessons of ${invDetail.CourseName} From the Date ${invDetail.BeginDate.slice(0, 10)}`, 35, 50);
      doc.text(`$${invDetail.LessonFee}`, 170, 50);
      doc.text(`${invDetail.ConcertFeeName}`, 35, 60);
      doc.text(`$${invDetail.ConcertFee}`, 170, 60);
      doc.text(`${invDetail.LessonNoteFeeName}`, 35, 70);
      doc.text(`$${invDetail.NoteFee}`,170,70);
      invDetail.Other1FeeName === null? count = 1 : doc.text(`Others: ${invDetail.Other1FeeName}`,35,80);
      invDetail.Other1Fee === null? count = 1 : doc.text(`$${invDetail.Other1Fee}`,170,80);
      invDetail.Other2FeeName === null? count = 1 : doc.text(`${invDetail.Other2FeeName}`,35,90);
      invDetail.Other2Fee===null? count = 1: doc.text(`$${invDetail.Other2Fee}`,170,90);
      invDetail.Other3FeeName===null? count = 1: doc.text(`${invDetail.Other3FeeName}`,35,100);
      invDetail.Other3Fee===null? count = 1 : doc.text(`$${invDetail.Other3Fee}`,170,100);
      // //total
      doc.setFontSize(25);
      doc.text(`TOTAL:$ ${invDetail.TotalFee}`,30,120);
      doc.setFontSize(10);
      doc.text(`Due Date: ${invDetail.DueDate}`,30, 130);
      doc.text(`Thank You!`,30,145);
      doc.save(`${this.learner.FirstName}  ${this.learner.LastName}'s invoice ${this.getCurrentDate()}`);

    }


    // get FirstName
    nameSubejct(){
      console.log('a')
      this.generalRepoService.fisrtName.subscribe(res=>
        {
        this.learner = res;
        console.log(this.learner)
        })
    }
    // make sure the data allignment
    incaseDateIsNull(){
      this.dataInvoice.forEach(element => {
        element.DueDate === null? element.DueDate = 'none' : element.DueDate = element.DueDate;
        element.LessonQuantity === null? element.LessonQuantity = 'Quantity of lesson is not available' : element.LessonQuantity = element.LessonQuantity;
        element.CourseName === null? element.CourseName = 'Course Name is not available' : element.CourseName = element.CourseName;
        element.LessonFee === null? element.LessonFee = 'Lesson Fee is not available' : element.LessonFee = element.LessonFee;
        element.BeginDate === null? element.BeginDate = 'none' : element.BeginDate = element.BeginDate;
        element.ConcertFeeName === null? element.ConcertFeeName = 'Concert is not available' : element.ConcertFeeName = element.ConcertFeeName;
        element.LessonNoteFeeName === null? element.LessonNoteFeeName = 'Note is not available' : element.LessonNoteFeeName = element.LessonNoteFeeName;
        element.NoteFee === null? element.NoteFee = 'Note fee is not available' : element.NoteFee = element.NoteFee;
        element.ConcertFee === null? element.ConcertFee = 'Concert Fee is not available' : element.ConcertFee = element.ConcertFee;
        console.log(element.CourseName)
      });
    }

    ngOnInit() {
      // put to service
      this.activatedRouter.paramMap.subscribe((obs:ParamMap) => {
        this.learnerId = parseInt(obs.get('id'));
        this.errMsgM = false;
        this.errMsgO = false;
        this.paymentsListService
        .getInvoice(this.learnerId)
        .subscribe(dataInvoice => {
          // return console.log(dataInvoice)
          this.dataInvoice = dataInvoice;
          this.incaseDateIsNull();
          this.reSearchPrepare();
        });
      });
      this.nameSubejct();
    }
}
