import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../../../../services/http/payment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ILearnerPay } from '../../../../../../models/learners';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-admin-learner-payment-invoice',
  templateUrl: './admin-learner-payment-invoice.component.html',
  styleUrls: ['./admin-learner-payment-invoice.component.css']
})
export class AdminLearnerPaymentInvoiceComponent implements OnInit {
  // invoice
  public dataInvoice: any;
  public learnerId: any;
  public addFund;
  // post payment
  public payment = 2;
  public postPayment: ILearnerPay;
  // tabset
  public array = [];
  public errorMsg;
  public successAlert = false;
  public errorAlert = false;
  // ng-modal variable
  closeResult: string;

  invoiceForm = this.fb.group({
    owing: ['', Validators.required]
  });
  get owing() {
    return this.invoiceForm.get('owing');
  }

    constructor(
    private modalService: NgbModal,
    private paymentsListService: PaymentService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
  userTab(j){
    this.invoiceForm.patchValue({
      owing : this.dataInvoice[j].OwingFee
    })
  }

    // select payment method
    paymentMethod(method) {
      this.payment = method.value;
    }
    postPaymentMethod(item) {
      this.postPayment = {
        StaffId: 1,
        LearnerId: item.LearnerId,
        InvoiceId: item.InvoiceId,
        PaymentMethod: this.payment,
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
              },
              (error) => {
                this.errorMsg = JSON.parse(error.error);
                this.errorAlert = true;
                console.log('Error!', this.errorMsg.ErrorCode);
                alert(this.errorMsg.ErrorCode);
              }
            );
          },
          reason => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    }
    // close alert
    closeSucc(){
      this.successAlert = false;
    }
    closeErro(){
      this.errorAlert = false;
    }

    ngOnInit() {
      // put to service
      this.route.paramMap.subscribe((obs:ParamMap) => {
        this.learnerId = parseInt(obs.get('id'))
        this.paymentsListService
        .getInvoice(this.learnerId)
        .subscribe(dataInvoice => {
          // return console.log(dataInvoice)
          this.dataInvoice = dataInvoice;
          this.array = [];
          this.dataInvoice.forEach((item, index) => {
            this.array.push(index);
          });
          this.invoiceForm.patchValue({
            owing : this.dataInvoice[0].OwingFee
          });
        });
      });
    }

}
