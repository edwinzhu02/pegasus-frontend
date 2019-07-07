import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDate, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminPaymentProductModalComponent } from '../admin-payment-product-modal/admin-payment-product-modal.component';
import { AdminPaymentConfirmModalComponent } from '../admin-payment-confirm-modal/admin-payment-confirm-modal.component';
import { AdminpaymentlistService } from '../../../../../../services/http/adminpaymentlist.service';
import { NgbootstraptableService } from '../../../../../../services/others/ngbootstraptable.service';
@Component({
  selector: 'app-admin-payment-list',
  templateUrl: './admin-payment-list.component.html',
  styleUrls: ['./admin-payment-list.component.css']
})
export class AdminPaymentListComponent implements OnInit {
  //loading
  public loadingFlag: boolean = false;
  public searchbar: boolean = false;
  public adminPaymentList: any;
  public adminPaymentListLength: number;
  public adminPaymentListCopy: Array<any>;
  public closeResult: string;
  public paymentMethod: any;
  public paymentType: any;
  public searchForm: FormGroup;
  public fromDate: NgbDate;
  public toDate: NgbDate;
  public page: number = 1;  //pagination current page
  public pageSize: number = 10;
  //search by which columns, determine by users
  public currentPage: number = 1;
  public queryParams: object = {};
  constructor(
    private modalService: NgbModal,
    private adminpaymentlistService: AdminpaymentlistService,
    private fb: FormBuilder,
    private ngTable: NgbootstraptableService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    this.searchForm = this.fb.group(this.formGroupAssemble());
  }
  formGroupAssemble() {
    let groupObj: any;
    groupObj = {
      BeginDate: [null, Validators.required],
      EndDate: [null, Validators.required]
    }
    return groupObj;
  }
  // Validate EndDate > BeginDate
  onBeginDateSelection(date: NgbDate) {
    if (date.after(this.toDate)) {
      Swal.fire({
        title: 'End Date must be later than Begin Date!',
        type: 'error',
        showConfirmButton: true,
      });
    } else {
      this.fromDate = date;
    }
  }
  onEndDateSelection(date: NgbDate) {
    if (date.before(this.fromDate)) {
      Swal.fire({
        title: 'End Date must be later than Begin Date!',
        type: 'error',
        showConfirmButton: true,
      });
    } else {
      this.toDate = date;
    }
  }
  // click the search
  onSubmit() {
    let valueToSubmit = this.searchForm.value;
    let vailadValue = this.checkInputVailad(valueToSubmit);
    if (vailadValue !== null) {
      let begin = vailadValue.BeginDate.year + "-" + vailadValue.BeginDate.month + "-" + vailadValue.BeginDate.day;
      let end = vailadValue.EndDate.year + "-" + vailadValue.EndDate.month + "-" + vailadValue.EndDate.day;
      if (begin > end) {
        Swal.fire({
          title: 'End Date must be later than Begin Date!',
          type: 'error',
          showConfirmButton: true,
        });
        return;
      } else {
        this.loadingFlag = true;
        this.submitByMode(begin, end);
      }
    } else {
      Swal.fire({
        title: 'Please check your input!',
        type: 'error',
        showConfirmButton: true,
      });
    }
  }
  // check whether data vailad or not(ruled by Validators).
  checkInputVailad(valueSubmit) {
    //once click save btn, touch all inputs form with for-loop. In order to trigger Validator
    for (let i in this.searchForm.controls) {
      this.searchForm.controls[i].touched == true;
    }
    if (this.searchForm.status == 'VALID') {
      return valueSubmit;
    } else {
      this.loadingFlag = false;
      return null;
    }
  }
  // submit search
  submitByMode(begindate, enddate) {
    this.adminpaymentlistService.getPaymentMethod().subscribe(
      (res) => {
        this.paymentMethod = res['Data'];
      }
    )
    this.adminpaymentlistService.getPaymentType().subscribe(
      (res) => {
        this.paymentType = res['Data'];
      }
    )
    this.adminpaymentlistService.getPaymentViews(begindate, enddate).subscribe(
      (res) => {
        this.adminPaymentList = res['Data'];
        this.adminPaymentListCopy = this.adminPaymentList;
        this.adminPaymentListLength = res['Data'].length; //length prop is under Data prop
        this.loadingFlag = false;
        this.searchbar = true;
        this.adminPaymentList.forEach(element => {
          element.LearnerName = element.Learner.FirstName + " " + element.Learner.LastName;
          element.StaffName = element.Staff.FirstName + " " + element.Staff.LastName;
          for (let i = 0; i < this.paymentMethod.length; i++) {
            if (this.paymentMethod[i].PropValue == element.PaymentMethod) {
              element.PaymentMethodName = this.paymentMethod[i].PropName
            }
          }
          for (let i = 0; i < this.paymentType.length; i++) {
            if (this.paymentType[i].PropValue == element.PaymentType) {
              element.PaymentTypeName = this.paymentType[i].PropName
            }
          }
          if (element.Invoice != null) {
            element.CourseName = element.Invoice.CourseName;
            element.LessonQuantity = element.Invoice.LessonQuantity;
          }
          if (element.SoldTransaction.length != 0) {
            for (let i = 0; i < element.SoldTransaction.length; i++) {
              element.ProductName = element.SoldTransaction[i].Product.ProductName;
            }
          }
        });
        console.log(res['Data'])
      },
      (err) => {
        Swal.fire({
          title: 'Server error!',
          type: 'error',
          showConfirmButton: true,
        });
        console.log(err.error.ErrorMessage);
      }
    )
  }
  /*
    items of queryParams:
      1, searchString
      2, searchBy
      3, orderBy
      4, orderControl
  */
  /*
   sort method
 */
  onSort(orderBy, orderControls?) {
    let orderControl = this.ngTable.sorting(this.adminPaymentList, orderBy, orderControls);
    this.setQueryParams('orderBy', orderBy);
    this.setQueryParams('orderControl', orderControl);
  }
  setQueryParams(paraName, paraValue) {
    if (paraValue == '') {
      delete this.queryParams[paraName];
      delete this.queryParams['searchBy'];
    }
    else {
      this.queryParams[paraName] = paraValue;
    }
    this.router.navigate(['transaction/payments'], {
      queryParams: this.queryParams
    });
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
  open(num, adminPaymentList) {
    if (num == 0) {
      const modalRef = this.modalService.open(AdminPaymentProductModalComponent);
      modalRef.componentInstance.adminPaymentList = adminPaymentList;
    } else if (num == 1) {
      const modalRef = this.modalService.open(AdminPaymentConfirmModalComponent);
      modalRef.componentInstance.adminPaymentList = adminPaymentList;
    }
  }
}
