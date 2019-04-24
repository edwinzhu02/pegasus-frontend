import { Component, OnInit } from '@angular/core';
import { UserDetailService } from '../../../services/user-detail.service';

import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons, } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';

import { ILearnerPay, IOtherPay } from './learners';

@Component({
  selector: 'app-learner-detail',
  templateUrl: './learner-details.component.html',
  providers: [NgbTabsetConfig],
  styleUrls: ['./learner-details.component.css']
})
export class LearnerDetailsComponent implements OnInit {
  a = false;
  // learners
  public name: any = 'type..';
  public learners: any;
  public data: any;
  public show: boolean;

  // invoice
  public dataInvoice: any;

  public learnerId: any;
  public addFund;
  // post payment
  public payment = 'Eftpos';
  public postPayment: ILearnerPay;
  // post other payment
  public otherPaymentObj: IOtherPay;
  public paymentTitle;
  public paymentAmount;
  // products
  public productName: any;
  public types = [];
  public categories = [];
  public products = [];
  public prodCatId;
  public prodTypeId;
  public productId;
  public payProducts= [1];
  public sectionCount = 1;
  public prodPayObj;
  // tabset
  public array = [];
  //product to invoice
  public isCollapsedI = false;
  // others Switch
  public showOthers = false;

  // ng-modal variable
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private _learnersListService: UserDetailService,
    private fb: FormBuilder,
    config: NgbTabsetConfig
  ) {
    // bootstrap tabset
    config.justify = 'center';
    config.type = 'pills';
  }

  // form-builder
  // learners information
  registrationFormL = this.fb.group({
    learnerId: [''],
    learnerName: [{ value: null, disabled: true }],
    lastName: [{ value: null, disabled: true }],
    middleName: [{ value: null, disabled: true }],
    age: [''],
    email: [{ value: null, disabled: true }],
    phone: [{ value: null, disabled: true }],
    payment: [''],
    schedule: [''],
    owning: [''],
    address: ['']
  });

  //product list fb
  productListForm = this.fb.group({
    productList: this.fb.array([
      this.fb.group({
      categories: [''],
      types: [''],
      products: [''],
    })
  ]),
  });

  get productList(){
    return this.productListForm.get('productList') as FormArray;
  }
  addOptions(){
    this.productList.push(this.fb.group({
      categories: [''],
      types: [''],
      products: [''],
    }));
  }
  removeOptions(index){
    if (this.productList.controls.length == 1){alert('This is already the last product list.')}
    else{
    this.productList.removeAt(index);}
  }


//other fb
  otherPayment = this.fb.group({
    title: ['', Validators.required],
    amount: ['', Validators.required]
  });
  get title() {
    return this.otherPayment.get('title');
  }
  get amount() {
    return this.otherPayment.get('amount');
  }

  searchForm = this.fb.group({
    search: ['', Validators.required]
  });
  get search() {
    return this.searchForm.get('search');
  }

  invoiceForm = this.fb.group({
    owing: ['', Validators.required]
  });
  get owing() {
    return this.invoiceForm.get('owing');
  }

  ngOnInit() {
    console.log(this.productList.controls)
  }

  // bootstrap-modal

  open(content) {
    // search learner
    this._learnersListService
      .getLearners(this.searchForm.value.search)
      .subscribe(data => {
        this.learners = data[0];
        this.data = data;
        this.registrationFormL.patchValue({
          learnerId: this.learners.LearnerId,
          learnerName: this.learners.FirstName,
          lastName: this.learners.LastName,
          email: this.learners.Email,
          phone: this.learners.ContactNum,
          address: this.learners.Address
        });
        // get invoice
        this._learnersListService
          .getInvoice(this.learners.LearnerId)
          .subscribe(dataInvoice => {
            this.dataInvoice = dataInvoice;
            this.array = [];
            this.dataInvoice.forEach((item, index) => {
              this.array.push(index);
            });
          });


        //get product data
        this._learnersListService
        .getProdType()
        .subscribe(types => {
        this.types = types['Data'];
        });

        this._learnersListService
        .getProdCad(this.prodTypeId)
        .subscribe(cat => {
        this.categories = cat['Data'];
        });

        this._learnersListService
        .getProdType()
        .subscribe(prod => {
        this.products = prod;
        });


        if (data.length > 1) {
          this.show = true;
        } else {
          this.show = false;
        }

        if (this.show) {
          this.modalService
            .open(content, { ariaLabelledBy: "modal-basic-title" })
            .result.then(
              result => {
                this.closeResult = `Closed with: ${result}`;
              },
              reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
              }
            );
        }
      });
  }

  // middle name method

  selectChange(dis) {
    const i: number = dis.value;
    if (!isNaN(Number(i))) {
      this.registrationFormL.patchValue({
        learnerId: this.data[i].LearnerId,
        learnerName: this.data[i].FirstName,
        lastName: this.data[i].LastName,
        email: this.data[i].Email,
        phone: this.data[i].ContactNum
      });
      this._learnersListService
        .getInvoice(this.data[i].LearnerId)
        .subscribe(dataInvoice => {
          this.dataInvoice = dataInvoice;
          this.array = [];
          this.dataInvoice.forEach((item, index) => {
            this.array.push(index);
          });
        });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // confirm payment open method
  openP(contentP, item) {
    this.addFund = this.invoiceForm.value.owing;
    this.modalService
      .open(contentP, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.postPayment = {
            StaffId: 1,
            LearnerId: item.LearnerId,
            InvoiceId: item.InvoiceId,
            PaymentMethod: this.payment,
            Amount: this.invoiceForm.value.owing
          };

          this._learnersListService.addFund(this.postPayment).subscribe(
            response => {
              console.log('Success!', response);
            },
            error => {
              console.error('Error!', error);
              alert(`Can not get data from server ${error}`);
            }
          );
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  // select payment method

  paymentMethod(method) {
    this.payment = method.value;
  }

  // select product

  selectType(dis) {
    this.prodTypeId = dis.value;
    console.log(this.prodTypeId);
  }
  selectCat(dis) {
    this.prodCatId = dis.value;
    console.log(this.prodCatId);
  }
  selectProd(dis) {
    this.productId = dis.value;
    console.log(this.productId);
  }

//confirm product payment
confirmProdSubmit(){
  this.prodPayObj = {
    StaffId: 1,
  }
  this._learnersListService.postProdService(this.prodPayObj).subscribe(
    response=>{
      console.log('Success!', response);
    },
    error => {
      alert(`Can not access server ${error}`);
    }
  )
}


//other payment

otherPaymentSubmit(){

  this.otherPaymentObj={
    StaffId: 1,
    LearnerId: this.learnerId,
    title: this.otherPayment.value.title,
    amount: this.otherPayment.value.amount

  }

  this._learnersListService.postPaymentService(this.otherPaymentObj).subscribe(
    response => {
    console.log('Success!', response);
  },
  error => {
    console.error('Error!', error);
    alert(`Can not access server ${error}`);
  }
);
}

}


