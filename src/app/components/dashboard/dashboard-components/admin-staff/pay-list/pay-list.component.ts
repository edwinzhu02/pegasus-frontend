import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDate, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {AdminPaymentConfirmModalComponent} from 'src/app/components/dashboard/dashboard-components/admin-transactions/admin-payment/admin-payment-confirm-modal/admin-payment-confirm-modal.component';
import { AdminpaymentlistService } from 'src/app/services/http/adminpaymentlist.service';
import {NgbootstraptableService} from 'src/app/services/others/ngbootstraptable.service';
import { AdminPaymentProductModalComponent } from '../../admin-transactions/admin-payment/admin-payment-product-modal/admin-payment-product-modal.component';
import { filter } from 'rxjs/operators';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { ReturnStatement } from '@angular/compiler';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'pay-list',
  templateUrl: './pay-list.component.html',
  styleUrls: ['./pay-list.component.css']
})
export class   PayListComponent implements OnInit {
  //loading
  public loadingFlag: boolean = false;
  public searchbar: boolean = false;
  public adminPaymentList: any;
  public adminPaymentListLength: number;
  public adminPaymentListCopy: Array<any>;
  public adminPaymentListTest: any;
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
  public searchValue:any;
  public colunsselect : Array<string>=['LearnerName','StaffName',
'CreatedAt','Amount','PaymentTypeName','PaymentMethodName','LessonQuantity','IsConfirmed'];
  
  constructor(
    private modalService: NgbModal,
    private adminpaymentlistService: AdminpaymentlistService,
    private fb: FormBuilder,
    private ngTable: NgbootstraptableService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    //private searchlist: NgbootstraptableService,
  ) { }
  ngOnInit() {
    this.searchForm = this.fb.group(this.formGroupAssemble());
    

    

  }
  formGroupAssemble() {
    let groupObj: any;
    let Startdate = new NgbDate(2019,7,25);
    let finishDate= new NgbDate(2019,7,31);
    groupObj = {
      BeginDate: [Startdate, Validators.required],
      EndDate: [finishDate, Validators.required]
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
      const enddate = new NgbDate(vailadValue.EndDate.year, vailadValue.EndDate.month, vailadValue.EndDate.day)
      if (enddate.before(vailadValue.BeginDate)) {
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

  // test do the confirmation

  onSearch(e:any){
    console.log(e.target.value);
    let temp=[];
    this.adminPaymentList=this.adminPaymentListCopy;
    
    for(let i=0;i<this.adminPaymentList.length;i++){
      if(this.adminPaymentList[i].IsConfirmed==e.target.value){
          temp.push(this.adminPaymentList[i]);
         
      }
      
    }
    console.log(this.adminPaymentList.length);
    this.adminPaymentList=temp;
    this.adminPaymentListTest=this.adminPaymentList;
    
    console.log(temp);
    console.log(this.adminPaymentList); 
  
  }
  // search the Info people print
//  onSearchInfo(event:any){
//    let temp=[];
//    this.adminPaymentList=this.adminPaymentListCopy;
//    let tep=[];
   
  
//   for (let i=0; i<this.adminPaymentList.length;i++){
//       for (let j=0;j<this.adminPaymentList[i].PaymentMethodName.split(" ").length;j++){
//             for (let k=0;k<this.adminPaymentList[i].PaymentMethodName.split(" ")[j].length;k++){
//               if(this.adminPaymentList[i].PaymentMethodName.split(" ")[j][k].toLowerCase().search(event.target.value)!==-1){
               
//                    temp.push(this.adminPaymentList[i]);
                                
                
//                }
//              }
//       }
//     for (let j=0;j<this.adminPaymentList[i].StaffName.split(" ").length;j++){
//       for (let k=0;k<this.adminPaymentList[i].StaffName.split(" ")[j].length;k++){
//         if(this.adminPaymentList[i].StaffName.split(" ")[j][k].toLowerCase().search(event.target.value)!==-1){
          
//             temp.push(this.adminPaymentList[i]);
          
//         }
//       }
//     }
//     for (let j=0;j<this.adminPaymentList[i].LearnerName.split(" ").length;j++){
//       for (let k=0;k<this.adminPaymentList[i].LearnerName.split(" ")[j].length;k++){
//         if(this.adminPaymentList[i].LearnerName.split(" ")[j][k].toLowerCase().search(event.target.value)!==-1){
          
//             temp.push(this.adminPaymentList[i]); 
//         }
//       }
//     }
    
    
       
//    } 
//    for(let i=0;i<temp.length;i++){
//       if(tep.indexOf(temp[i])==-1){
//         tep.push(temp[i]);
//       }
//     }
//    console.log(this.adminPaymentList[0].StaffName.split(" "));
//    this.adminPaymentList=tep;
   
//  }



onSearchInfo(event:any){
  this.adminPaymentList=this.adminPaymentListCopy;
   let colunsearch=['LearnerName','StaffName','CreatedAt','CourseName','PaymentTypeName',
  'PaymentMethodName', 'LessonQuantity',]
  let tep=[];
  let temp=[];
  
  let a='PaymentTypeName';
  //console.log(this.adminPaymentList[0].LessonQuantity);
  // console.log( this.adminPaymentList[0].CreatedAt.slice(0,10));
  // console.log(this.adminPaymentList[0].PaymentTypeName);
  // console.log(this.adminPaymentList[0].PaymentMethodName);
  // console.log(typeof this.adminPaymentList[0].LessonQuantity);
  // console.log(this.adminPaymentList);
  
  
   // console.log(this.adminPaymentList[0].CreatedAt.search(event.target.value))
    
    //console.log(this.adminPaymentList[0][i].search(event.target.value)); 
    //console.log(this.adminPaymentList.length);
    for (let j=0;j<this.adminPaymentList.length;j++){
     
       let tempvalue=this.adminPaymentList[j];
       
          if(tempvalue.StaffName.toLowerCase().search(event.target.value.toLowerCase())!==-1){
           tep.push(this.adminPaymentList[j]);
          }
          if(tempvalue.LearnerName.toLowerCase().search(event.target.value.toLowerCase())!==-1){
            tep.push(this.adminPaymentList[j]);
          }
          if(tempvalue.CreatedAt.toLowerCase().slice(0,10).search(event.target.value.toLowerCase())!==-1){
            tep.push(this.adminPaymentList[j]);
          }
          if ( tempvalue.CourseName){
              if(tempvalue.CourseName.toLowerCase().search(event.target.value.toLowerCase())!==-1){
               tep.push(this.adminPaymentList[j]);
             }
          }
           
          if(tempvalue.Amount.toString().toLowerCase().search(event.target.value.toLowerCase())!==-1){
              tep.push(this.adminPaymentList[j]);
            }
          if(tempvalue.PaymentMethodName.toLowerCase().search(event.target.value.toLowerCase())!==-1){
            tep.push(this.adminPaymentList[j]);
          }
          if(tempvalue.PaymentTypeName.toLowerCase().search(event.target.value.toLowerCase())!==-1){
            tep.push(this.adminPaymentList[j]);
          }
          if(tempvalue.LessonQuantity){
            if(tempvalue.LessonQuantity.toString().toLowerCase().search(event.target.value.toLowerCase())!==-1){
             tep.push(this.adminPaymentList[j]);
           }
          }
           

        
     }
 
    for(let i=0;i<tep.length;i++){
      if(temp.indexOf(tep[i])==-1){
        temp.push(tep[i]);
      }
    }
    this.adminPaymentList=temp;


}

        
  
   //console.log(event.target.value);
  //  for (let i=0;i<this.adminPaymentList.length;i++){
  //    console.log(this.adminPaymentList[0]);
  //    for (let value=0;value<this.colunsselect.length;value++){
  //    let tep=this.colunsselect[value];
     
   
     
     
  //  }
     
  //  }
   
  // if (event == null) {
  //   return this.adminPaymentList;
  // }
  // else {
    //let searchString: string;
    //let searchBy: string;
    //let searchingInputObj = document.getElementById('searchingInput');
   // let optionsObj = document.getElementById('searchOption');
    //let searchBy=document.getElementById('seachingInput');
    
    // 这个可以用！！！！！！！keydown
    // this.adminPaymentList = this.ngTable.searching(this.adminPaymentListCopy, this.OnchangeOther(event),event.target.value);
    // this.adminPaymentListLength = this.adminPaymentList.length;
   
   
    //optionsObj['value'] = searchBy;
  // }

//这个方法用来选择列 如果有需要的画
// OnchangeOther(event:any){
 
//   return this.searchValue=this.searchValue;

// }
// showSearchingSelection(event) {
//   let dropDownObj = document.getElementById('t_info_search_by_btn');
//   event.target.attributes.flag = !event.target.attributes.flag;
 
//   if (event.target.attributes.flag == true) {
//     let searchingInputObj = document.getElementById('searchingInput');
//     searchingInputObj['value'] = null;
//     dropDownObj.style.display = 'inline-block';
//   }
//   else {
//     dropDownObj.style.display = 'none';
//   }
//  }
        //  this.adminPaymentList=this.adminPaymentListCopy;
        //  console.log(this.adminPaymentList[0]);
        //  this.adminPaymentList=this.ngTable.searching(this.adminPaymentList,'PaymentMethodName',e.target.value);
  //     let temp=[];
  //     this.adminPaymentList=this.adminPaymentListCopy;
     
  //     console.log(e.target.value);
     
  //     for (let i=0; i<this.adminPaymentList.length;i++){

        
  //       //console.log(this.adminPaymentList[0]); 
  //       console.log(this.adminPaymentList[0].PaymentMethodName);
  //       //console.log(this.adminPaymentList[0].PaymentMethodName.split(" ")[0]);
  //       console.log(this.adminPaymentList[0].PaymentMethodName.split(" ")[0].length);
  //       console.log(this.adminPaymentList[0].PaymentMethodName.split(" ")[0][0]);
  //       console.log(this.adminPaymentList[0].PaymentMethodName.split(" ")[0][0].search(e.target.value));
  //        for (let j=0;j<this.adminPaymentList[i].PaymentMethodName.split(" ").length;j++){
  //          for (let k=0;k<this.adminPaymentList[i].PaymentMethodName.split(" ")[j].length;k++){
  //            if(this.adminPaymentList[i].PaymentMethodName.split(" ")[j][k].search(e.target.value)!==-1){
  //              temp.push(this.adminPaymentList[i]);
  //            }
  //          }
  //        }
     
  // } 
  // console.log(temp);
  // this.adminPaymentList=temp;

 //}
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
     this.router.navigate(['staff/paylist'], {
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