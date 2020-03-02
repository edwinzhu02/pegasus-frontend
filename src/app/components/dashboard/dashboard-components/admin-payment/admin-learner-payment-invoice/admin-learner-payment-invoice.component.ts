import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PaymentService } from '../../../../../services/http/payment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbTab, NgbTabTitle, } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ILearnerPay } from '../../../../../models/learners';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GeneralRepoService } from '../../../../../services/repositories/general-repo.service';
import { LearnersService } from '../../../../../services/http/learners.service';
import { DownloadPDFService, IInvoiceLearnerName, IInvoice } from "../../../../../services/others/download-pdf.service"
import Swal from "sweetalert2"

@Component({
  selector: 'app-admin-learner-payment-invoice',
  templateUrl: './admin-learner-payment-invoice.component.html',
  styleUrls: ['./admin-learner-payment-invoice.component.css']
})
export class AdminLearnerPaymentInvoiceComponent implements OnInit, OnDestroy {
  // active modal get by model template
  @Input() whichLearner;
  // invoice
  public dataInvoice: any;
  public learnerId: any;
  learner;
  public learnerAll: any;
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
  private org:any;
  public dateCurrent;
  // ng-modal variable
  closeResult: string;
  // distroy subscribe
  fistNameSubscription
  // not show invoice data;
  noInvoice = false;
  // id get from admin learner profile
  // whichLearner;
  credit:number;
  isCredit=false;


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
    private downloadPDFService: DownloadPDFService,
    private learnersService:LearnersService,
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
  fetchNews(event) {
    console.log(event)
    let activeId = event.nextId;
    this.invoiceForm.patchValue({
      owing: Math.abs(this.dataInvoice[activeId].OwingFee)
    });
    //need confirm , why need process this condition?
    //   if (this.dataInvoice.length > 3) {
    //     this.invoiceForm.patchValue({
    //       owing : 0
    //     });
    //   } else {
    //   const id = Number(event.activeId.slice(8));
    //   switch (id) {
    //     case 0:
    //     this.invoiceForm.patchValue({
    //       owing : Math.abs(this.dataInvoice[1].OwingFee)
    //     });
    //     break;
    //     case 1:
    //     this.invoiceForm.patchValue({
    //       owing : Math.abs(this.dataInvoice[0].OwingFee)
    //     });
    //   }
    // }
  }

  // create post obj
  postPaymentMethod(item) {
    this.postPayment = {
      StaffId: Number(localStorage.getItem('staffId')),
      OrgId: Number(JSON.parse(localStorage.getItem('OrgId'))[0]),
      LearnerId: item.LearnerId,
      InvoiceId: item.InvoiceId,
      PaymentMethod: this.paymentMethodI.value,
      Amount: this.invoiceForm.value.owing,
      UseCredit:this.isCredit
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
          console.log('!!!!!', this.postPayment)
          this.paymentsListService.addFund(this.postPayment).subscribe(
            response => {
              console.log('Success!', response);
              this.successAlert = true;
              Swal.fire({
                title: 'Your Payment Has Been Made!',
                type: 'success',
                showConfirmButton: true,
              });
              //this.router.navigate(['../success'], { relativeTo: this.activatedRouter });
              this.ngOnInit();
            },
            (error) => {
              this.errorMsg = JSON.parse(error.error);
              this.errorAlert = true;
              //alert(this.errorMsg.ErrorCode);
              Swal.fire({
                title: 'Error!',
                text: 'Sorry! ' + this.errorMsg.ErrorCode,
                type: 'error',
              });

            }
          );
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  // change payment clearing message
  changePayment() {
    this.errMsgM = false;
  }
  // valid payment method
  validMethodI(contentP, item, j) {
    if (this.invoiceForm.controls.paymentMethodI.invalid === true) {
      this.errMsgM = true;
    }
    if ((!this.isCredit&&this.invoiceForm.value.owing <= 0 )||
        (this.isCredit&&this.invoiceForm.value.owing < 0 ))
        // ||
      //  (this.invoiceForm.value.owing + this.isCredit?this.credit:0)  > this.dataInvoice[j].OwingFee) 
        {
      this.errMsgO = true;
    }
    if (this.errMsgM || this.errMsgO) {
      return;
    }
    if (localStorage.getItem("Role") != '3') {
      Swal.fire({
        title: 'Error!',
        text: 'Sorry! Only Receiptionist Can Do Payment!' ,
        type: 'error',
      });   
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
  closeSucc() {
    this.successAlert = false;
  }
  closeErro() {
    this.errorAlert = false;
  }

  // make new search
  reSearchPrepare() {
    // in case have mutiple invoices
    this.arrayInv = [];
    this.dataInvoice.forEach((item, index) => {
      this.arrayInv.push(index);
    });
    this.invoiceForm.patchValue({
      owing: Math.abs(this.dataInvoice[0].OwingFee),
      paymentMethodI: null
    });
  }
  getCurrentDate() {
    let dateObj = new Date;
    let year = dateObj.getFullYear().toString();
    let month = dateObj.getMonth().toString();
    let date = dateObj.getDate().toString();
    let hour = dateObj.getHours().toString();
    let min = dateObj.getMinutes().toString();
    return this.dateCurrent = `${hour}:${min} ${date}/${month}/${year}`
  }

  //有bug 页面如果刷新，则无法取到正确的this.learner的值, 采用判断数据类型的方法分类
  downloadPDFReady(index: number) {
    let learnerName = {} as IInvoiceLearnerName;
    console.log(this.learner,this.whichLearner);
    // if (typeof this.learner == "string") {
    //   learnerName.firstName = this.learner.split(" ")[0]
    //   learnerName.lastName = this.learner.split(" ")[1]
    // } else {
    //   learnerName.firstName = this.learner.FirstName
    //   learnerName.lastName = this.learner.LastName
    //   learnerName.Email = this.learner.Email
    // }
      learnerName.firstName = this.learnerAll.FirstName
      learnerName.lastName = this.learnerAll.LastName
      learnerName.Email = this.learnerAll.Email

    let invoice: IInvoice = this.dataInvoice[index]
    console.log(learnerName, invoice)
    let branch = this.org;
    console.log( this.org,invoice);
    this.downloadPDFService.downloadPDF(learnerName, invoice,branch )
  }


  // get FirstName
  nameSubejct() {
    this.fistNameSubscription = this.generalRepoService.fisrtName.subscribe(res => {
      this.learner = res;
      console.log(this.learner)
    }, error => {
      console.log(error);
      this.errorMsg = JSON.parse(error.error);
      this.errorAlert = true;
      //alert(this.errorMsg);
    })
  }
  // make sure the data allignment
  incaseDateIsNull() {
    this.dataInvoice.forEach(element => {
      element.DueDate === null ? element.DueDate = 'none' : element.DueDate = element.DueDate;
      element.LessonQuantity === null ? element.LessonQuantity = 'Quantity of lesson is not available' : element.LessonQuantity = element.LessonQuantity;
      element.CourseName === null ? element.CourseName = 'Course Name is not available' : element.CourseName = element.CourseName;
      element.LessonFee === null ? element.LessonFee = 0 : element.LessonFee = element.LessonFee;
      element.BeginDate === null ? element.BeginDate = 'none' : element.BeginDate = element.BeginDate;
      element.ConcertFeeName === null ? element.ConcertFeeName = 'Concert' : element.ConcertFeeName = element.ConcertFeeName;
      element.LessonNoteFeeName === null ? element.LessonNoteFeeName = 'Note' : element.LessonNoteFeeName = element.LessonNoteFeeName;
      element.NoteFee === null ? element.NoteFee = 0 : element.NoteFee = element.NoteFee;
      element.ConcertFee === null ? element.ConcertFee = 0 : element.ConcertFee = element.ConcertFee;
      console.log(element.CourseName)
    });
  }
  // delete tab section if only one invoice
  getSingleTab(){
    if (!document.querySelector('.nav-pills')) return;
    // question how to check whether we have a d-none class
    document.querySelector('.nav-pills').classList.remove('d-none');
    if (this.dataInvoice.length == 1){
    document.querySelector('.nav-pills').classList.add('d-none');}
  }

  ngOnInit() {
    if (!this.whichLearner) {
      // put to service
      this.activatedRouter.paramMap.subscribe((obs: ParamMap) => {
        //  this.learnerId = this.activatedRouter.snapshot.paramMap.get("id")
        this.learnerId = parseInt(obs.get('id'));
        this.payInvoiceService(this.learnerId);
      });
    } else {
      this.learnerId = this.whichLearner;
      this.payInvoiceService(this.learnerId);
    }
    this.nameSubejct();
    // this.getSingleTab();
    this.getOrgs(this.learnerId);
    this.getLearner(this.learnerId);
  }

  getOrgs(id:number){
    this.learnersService.getOrgById(id).subscribe(res => {
      this.org = res['Data'];
    },
      err =>{
        Swal.fire({
          title: 'Error!',
          text: 'Sorry! Can not get Data from Server！' ,
          type: 'error',
        });        
      }
    )
  }
  getLearner(id:number){
    this.learnersService.getLearnerById(id).subscribe(res => {
      this.learnerAll = res['Data'];
      this.credit = this.learnerAll.Credit;
    },
      err =>{
        Swal.fire({
          title: 'Error!',
          text: 'Sorry! Can not get Data from Server！' ,
          type: 'error',
        });        
      }
    )
  }


  payInvoiceService(id) {
    this.errorAlert = false;
    this.errorMsg = '';
    this.errMsgM = false;
    this.errMsgO = false;
    this.paymentsListService
      .getInvoice(id)
      .subscribe(res => {
        this.noInvoice = false
        // return console.log(dataInvoice)
        this.dataInvoice = res['Data'];
        console.log(this.dataInvoice)
        if (!this.dataInvoice) {
          this.noInvoice = true;
          this.errorMsg  = "This student don't need to pay!";
          this.errorAlert = true;
         //alert(this.errorMsg);
  
          // Swal.fire({
          //   title: 'Error!',
          //   text: 'Sorry! ' + "no invoice for this student",
          //   type: 'error',
          // });
        }
        console.log(this.dataInvoice)
        if (this.dataInvoice){
          this.getSingleTab();
          this.incaseDateIsNull();
          this.reSearchPrepare();
        }
      }, error => {
        console.log(error);
        this.noInvoice = true;
        this.errorMsg =error.error.ErrorMessage;
        this.errorAlert = true;
        alert(this.errorMsg);
        // Swal.fire({
        //   title: 'Error!',
        //   text: 'Sorry! ' + error.error.ErrorMessage,
        //   type: 'error',
        // });
      });
  }
  useCredit(e,index){
    console.log(e,index);
    this.isCredit = e.target.checked;
    this.patchOwingFee(index)
  }
  patchOwingFee(index){
    let owingFee =Math.abs(this.dataInvoice[index].OwingFee) -
          (this.isCredit?this.credit:0);
    owingFee = owingFee<0?0:owingFee;
    this.invoiceForm.patchValue({
      owing: Math.abs(owingFee)
    });
  }
  ngOnDestroy() {
    this.fistNameSubscription.unsubscribe();
  }
}
