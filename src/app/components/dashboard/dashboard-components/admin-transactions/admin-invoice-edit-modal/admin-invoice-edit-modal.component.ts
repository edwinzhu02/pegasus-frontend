import { IInvoice } from './../../../../../services/others/download-pdf.service';
import { ModelTemplateComponent } from 'src/app/shared/components/model-template/model-template.component';
import { Component, OnInit, Input, Output, EventEmitter,ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validator, Validators, RequiredValidator } from '@angular/forms';
import { TransactionService } from '../../../../../services/http/transaction.service';
import { InvoiceValidatorsService } from "src/app/services/others/invoice-validators.service"
import { LookUpsService } from "src/app/services/http/look-ups.service"
import { restoreView } from '@angular/core/src/render3';
import swal from "sweetalert2"
import { getElementDepthCount } from '@angular/core/src/render3/state';

@Component({
  selector: 'app-admin-invoice-edit-modal',
  templateUrl: './admin-invoice-edit-modal.component.html',
  styleUrls: ['./admin-invoice-edit-modal.component.css'],
})
export class AdminInvoiceEditModalComponent implements OnInit {
  @Output() confirmed = new EventEmitter<boolean>()
  public errorMsg;
  public errorAlert = false;
  public errMsgO = false;
  public errMsgM = false;
  public successAlert = false;
  public staffId = 3;
  closeResult: string;
  dueDateLocal;
  owingFeeLocal: number;
  itemTempPublic;
  courseData;
  coursePrice;
  concertData: Array<any>
  noteData: Array<any>
  originPrice = 0;
  userChosenPrice = 0;
  concertInUse: boolean = true
  noteInUse: boolean = true
  auralInUse:boolean = false
  theoryInUse:boolean = false
  tempNote 
  tempOther2  //Aural
  tempOther3  //Theory
  tempConcert
  tempOther1Fee: number = 0
  tempOther2Fee: number = 0
  tempOther3Fee: number = 0
  tempLessonFee: number = 0
  tempConcertFee: number = 20
  tempNoteFee: number = 10;
  tempAuralFee: number = 5;
  tempTheoryFee: number = 5;  
  tempOther4Fee: number = 0
  tempOther5Fee: number = 0
  tempOther6Fee: number = 0
  tempOther7Fee: number = 0
  tempOther8Fee: number = 0
  tempOther9Fee: number = 0
  tempOther10Fee: number = 0
  tempOther11Fee: number = 0
  tempOther12Fee: number = 0
  tempOther13Fee: number = 0
  tempOther14Fee: number = 0
  tempOther15Fee: number = 0
  tempOther16Fee: number = 0
  tempOther17Fee: number = 0
  tempOther18Fee: number = 0
  item2: any;
  isLoading:Boolean =false;
  totalFee: number;
  @ViewChild('Check1') inputCheck1; 
  @ViewChild('Check2') inputCheck2; 
  @ViewChild('Check3') inputCheck3; 


  // activated modal tranfer data
  @Input() item;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public modalService: NgbModal,
    private transactionService: TransactionService,
    private invoiceValidator: InvoiceValidatorsService,
    private lookUpsService: LookUpsService
  ) { }

  // invoice list fb
  invoiceEditForm = this.fb.group({
    DueDate: [null],
    CourseName: [null, Validators.required],
    LessonQuantity: [null, Validators.required],
    BeginDate: [null],
    LessonFee: [null, Validators.required],
    Concert: this.fb.group({
      ConcertFeeName: [{ value: null }],
      ConcertFee: [{ value: null }],
      concertCheckBox: [false],
    }, { validator: this.invoiceValidator.matcher }),
    Note: this.fb.group({
      LessonNoteFeeName: [{ value: null }],
      NoteFee: [{ value: null }],
      noteCheckBox: [false]
    }, { validator: this.invoiceValidator.matcher }),
    Other1: this.fb.group({
      Other1FeeName: [null],
      Other1Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other2: this.fb.group({
      Other2FeeName: [null],
      Other2Fee: [null],
      auralCheckBox:[false]
    }, { validator: this.invoiceValidator.matcher }),
    Other3: this.fb.group({
      Other3FeeName: [null],
      Other3Fee: [null],
      theoryCheckBox:[false]
    }, { validator: this.invoiceValidator.matcher }),
    Other4: this.fb.group({
      Other4FeeName: [null],
      Other4Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other5: this.fb.group({
      Other5FeeName: [null],
      Other5Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other6: this.fb.group({
      Other6FeeName: [null],
      Other6Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other7: this.fb.group({
      Other7FeeName: [null],
      Other7Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other8: this.fb.group({
      Other8FeeName: [null],
      Other8Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other9: this.fb.group({
      Other9FeeName: [null],
      Other9Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other10: this.fb.group({
      Other10FeeName: [null],
      Other10Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other11: this.fb.group({
      Other11FeeName: [null],
      Other11Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other12: this.fb.group({
      Other12FeeName: [null],
      Other12Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other13: this.fb.group({
      Other13FeeName: [null],
      Other13Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other14: this.fb.group({
      Other14FeeName: [null],
      Other14Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other15: this.fb.group({
      Other15FeeName: [null],
      Other15Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other16: this.fb.group({
      Other16FeeName: [null],
      Other16Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other17: this.fb.group({
      Other17FeeName: [null],
      Other17Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    Other18: this.fb.group({
      Other18FeeName: [null],
      Other18Fee: [null]
    }, { validator: this.invoiceValidator.matcher }),
    PaidFee: [null],
    OwingFee: [null],
    Comment: [null]
  });

  // get quantity
  get LessonQuantity() {
    return this.invoiceEditForm.get('LessonQuantity');
  }

  ngOnInit() {
    if (this.item.Invoice.InvoiceId === 0)
      this.item2 = { ... this.item, ...this.item.InvoiceWaitingConfirm };
    else
      this.item2 = { ... this.item, ...this.item.Invoice };
    this.setDataIfConfirmed()
    this.patchToInvoice();
    this.dueDateLocal = this.item2.DueDate;
    this.owingFeeLocal = this.item2.TotalFee || this.item2.LessonFee;
    this.tempLessonFee = this.item2.LessonFee
    this.getCourse();
    this.getLooksUpData();    
  }
  

  setDataIfConfirmed() {
    if (!this.item2.ConcertFee) {
      this.checkboxOnChange("concertCheckBox")
    } else {
      this.tempConcertFee = this.item2.ConcertFee
      this.invoiceEditForm.get("Concert").get("concertCheckBox").patchValue(true)
    }
    if (!this.item2.NoteFee) {
      this.checkboxOnChange("noteCheckBox")
    } else {
      this.tempNoteFee = this.item2.NoteFee
      this.invoiceEditForm.get("Note").get("noteCheckBox").patchValue(true)
    }
  }

  // get group or 121 course id
  getCourse() {
    let type;
    let courseId = this.item2.CourseInstanceId
    let groupCourseID = this.item2.GroupCourseInstanceId
    switch (courseId) {
      case null:
        type = 1;
        courseId = groupCourseID
        break;
      default:
        type = 0;
    }
    if (courseId == null)
      this.coursePrice = this.item2.LessonFee;
    else
      this.transactionService.GroupOr121(courseId, type)
        .subscribe(
          res => {
            this.courseData = res
            this.coursePrice = res.Data.Course.Price;
          },
          error => {
            this.errorMsg = JSON.parse(error.error);
            console.log("Error!", this.errorMsg.ErrorMsg);
            this.errorAlert = false;
          });
  }

  // patch data to invoiceEditForm
  patchToInvoice() {
    this.invoiceEditForm.patchValue({
      CourseName: this.item2.CourseName,
      LessonQuantity: this.item2.LessonQuantity,
      BeginDate: this.item2.BeginDate === null ? null : this.item2.BeginDate.slice(0, 10),
      LessonFee: this.item2.LessonFee || 0,
      Concert: {
        ConcertFee: this.item2.ConcertFee,
        ConcertFeeName: this.item2.ConcertFeeName
      },
      Note: {
        NoteFee: this.item2.NoteFee,
        LessonNoteFeeName: this.item2.LessonNoteFeeName
      },
      Other3: {
        Other3FeeName: this.item2.Other3FeeName,
        Other3Fee: this.item2.Other3Fee || 0
      }, 
      Other1: {
        Other1FeeName: this.item2.Other1FeeName,
        Other1Fee: this.item2.Other1Fee || 0,
      },
      Other2: {
        Other2FeeName: this.item2.Other2FeeName,
        Other2Fee: this.item2.Other2Fee || 0,
      },
      Other4: {
        Other4FeeName: this.item2.Other4FeeName,
        Other4Fee: this.item2.Other4Fee || 0
      },
      Other5: {
        Other5FeeName: this.item2.Other5FeeName,
        Other5Fee: this.item2.Other5Fee || 0
      },
      Other6: {
        Other6FeeName: this.item2.Other6FeeName,
        Other6Fee: this.item2.Other6Fee || 0
      },
      Other7: {
        Other7FeeName: this.item2.Other7FeeName,
        Other7Fee: this.item2.Other7Fee || 0
      },
      Other8: {
        Other8FeeName: this.item2.Other8FeeName,
        Other8Fee: this.item2.Other8Fee || 0
      },
      Other9: {
        Other9FeeName: this.item2.Other9FeeName,
        Other9Fee: this.item2.Other9Fee || 0
      },
      Other10: {
        Other10FeeName: this.item2.Other10FeeName,
        Other10Fee: this.item2.Other10Fee || 0
      },
      Other11: {
        Other11FeeName: this.item2.Other11FeeName,
        Other11Fee: this.item2.Other11Fee || 0
      },
      Other12: {
        Other12FeeName: this.item2.Other12FeeName,
        Other12Fee: this.item2.Other12Fee || 0
      },
      Other13: {
        Other13FeeName: this.item2.Other13FeeName,
        Other13Fee: this.item2.Other13Fee || 0
      },
      Other14: {
        Other14FeeName: this.item2.Other14FeeName,
        Other14Fee: this.item2.Other14Fee || 0
      },
      Other15: {
        Other15FeeName: this.item2.Other15FeeName,
        Other15Fee: this.item2.Other15Fee || 0
      },
      Other16: {
        Other16FeeName: this.item2.Other16FeeName,
        Other16Fee: this.item2.Other16Fee || 0
      },
      Other17: {
        Other17FeeName: this.item2.Other17FeeName,
        Other17Fee: this.item2.Other17Fee || 0
      },
      Other18: {
        Other18FeeName: this.item2.Other18FeeName,
        Other18Fee: this.item2.Other18Fee || 0
      },
      PaidFee: this.item2.PaidFee,
      Comment: this.item2.Comment
    });
    // this.setCheckBox();
  }
  setCheckBox(){
    if (this.item2.Other14Fee==-5){
      this.inputCheck1.nativeElement['checked']=true;
      // document.getElementById('Check1')['checked']=true;
    }
    if (this.item2.Other15Fee==-10){
      this.inputCheck2.nativeElement['checked']=true;
    }
    if (this.item2.Other16Fee==-15){
      this.inputCheck3.nativeElement['checked']=true;
    }
  }

  // moniting user change course quantity
  changeQuantity() {
    this.invoiceEditForm.patchValue({
      LessonFee: Number(this.invoiceEditForm.value.LessonQuantity) * Number(this.coursePrice)
    });
    this.feeOnChange("LessonFee")
  }

  closeSucc() {
    this.successAlert = false;
  }
  closeErro() {
    this.errorAlert = false;
  }

  validateDisount(){
    if (this.invoiceEditForm.value.Other17.Other17Fee >0 ||
      this.invoiceEditForm.value.Other18.Other18Fee >0){
        swal.fire({
          title: 'Discount Amount must be negative!',
          type: 'error',
          showConfirmButton: true,
        });
        return false
      }

    if (this.invoiceEditForm.value.Comment !=null &&
      this.invoiceEditForm.value.Comment.length >5 ) return true;

    if ((this.invoiceEditForm.value.Other14<0)||
        (this.invoiceEditForm.value.Other15<0)||
        (this.invoiceEditForm.value.Other16<0)||
        (this.invoiceEditForm.value.Other17<0)||
        (this.invoiceEditForm.value.Other18<0))
        {
          swal.fire({
            title: 'Please Add a Discount Reason, at least 5 characters!',
            type: 'error',
            showConfirmButton: true,
          });
          return false
        }
    else {

      return true;
    }
  }
  // post data to server side
  sendMail(confirmModal) {
    if (!this.validateDisount()) return;
    if (this.invoiceEditForm.invalid) {
      this.errMsgM = true;
    } else {
      this.open(confirmModal);
    }
  }

  // data combination
  combiData() {
    let data = {
      BeginDate: this.invoiceEditForm.value.BeginDate,
      CourseName: this.invoiceEditForm.value.CourseName,
      DueDate: this.dueDateLocal,
      LessonFee: this.invoiceEditForm.value.LessonFee,
      LessonQuantity: this.invoiceEditForm.value.LessonQuantity,
      OwingFee: this.invoiceEditForm.value.OwingFee,
      PaidFee: this.invoiceEditForm.value.PaidFee,
      ...this.invoiceEditForm.getRawValue().Concert,
      ...this.invoiceEditForm.getRawValue().Note,
      ...this.invoiceEditForm.value.Other1,
      ...this.invoiceEditForm.value.Other2,
      ...this.invoiceEditForm.value.Other3,
      ...this.invoiceEditForm.value.Other4,
      ...this.invoiceEditForm.value.Other5,
      ...this.invoiceEditForm.value.Other6,
      ...this.invoiceEditForm.value.Other7,
      ...this.invoiceEditForm.value.Other8,
      ...this.invoiceEditForm.value.Other9,
      ...this.invoiceEditForm.value.Other10,
      ...this.invoiceEditForm.value.Other11,
      ...this.invoiceEditForm.value.Other12,
      ...this.invoiceEditForm.value.Other13,
      ...this.invoiceEditForm.value.Other14,
      ...this.invoiceEditForm.value.Other15,
      ...this.invoiceEditForm.value.Other16,
      ...this.invoiceEditForm.value.Other17,
      ...this.invoiceEditForm.value.Other18,
      WaitingId: this.item2.WaitingId,
      InvoiceNum: this.item2.InvoiceNum,
      LearnerId: this.item2.LearnerId,
      LearnerName: this.item2.LearnerName,
      TermId: this.item2.TermId,
      GroupCourseInstanceId: this.item2.GroupCourseInstanceId,
      CourseInstanceId: this.item2.CourseInstanceId,
      Comment: this.invoiceEditForm.value.Comment
    }
    data.OwingFee = (+data.LessonFee||0)+ (+data.ConcertFee||0) 
      + (+data.NoteFee||0) + (+data.Other1Fee||0) + (+data.Other2Fee||0) + (+data.Other3Fee||0)
      + (+data.Other4Fee||0) + (+data.Other5Fee||0) + (+data.Other6Fee||0)
      + (+data.Other7Fee||0) + (+data.Other8Fee||0) + (+data.Other9Fee||0)
      + (+data.Other10Fee||0) + (+data.Other11Fee||0) + (+data.Other12Fee||0)
      + (+data.Other13Fee||0) + (+data.Other14Fee||0) + (+data.Other15Fee||0)
      + (+data.Other16Fee||0) + (+data.Other17Fee||0) + (+data.Other18Fee||0);
    data.TotalFee = data.OwingFee;

    this.itemTempPublic = data
  }

  putInvoiceData() {
    this.transactionService.update(this.itemTempPublic)
      .subscribe(
        (res) => {
          this.activeModal.close();

          swal.fire({
            title: 'Your Operation Has Been Saved!',
            type: 'success',
            showConfirmButton: true,
          });

          this.item2.IsConfirmed = 1
          console.log(this.itemTempPublic)
        },
        (error) => {
          console.log(error)
          this.errorMsg = error.error.ErrorMessage;
          console.log(this.errorMsg);
          this.errorAlert = true;
        },
      );
  }

  // confirm Modal
  open(confirmModal) {
    this.combiData();
    this.validatePrice();
    this.modalService
      .open(confirmModal)
      .result.then(
        (result) => {
          this.putInvoiceData();
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
  }

  // validate lesson price
  validatePrice() {
    this.originPrice = Number(this.invoiceEditForm.value.LessonQuantity) * Number(this.coursePrice);
    this.userChosenPrice = this.invoiceEditForm.value.LessonFee;
  }

  // dismiss reason of modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getLooksUpData() {
    this.lookUpsService.getLookUps(15).subscribe(
      res => {
        this.concertData = res["Data"]
        this.tempConcert = {
          Concert: {
            ConcertFee: this.item2.ConcertFee || +this.concertData[1].PropName,
            ConcertFeeName: this.item2.ConcertFeeName || this.concertData[0].PropName
          }
        };
        this.setCheckBox();
      },
      error => {
        console.log(error)
      })

    this.lookUpsService.getLookUps(19).subscribe(
      res => {
        let auralData = res["Data"]
        this.tempAuralFee = Number(auralData[1].PropName);
        this.tempOther2 = {
          Other2: {
            Other2Fee: this.item2.Other2Fee || +auralData[1].PropName,
            Other2FeeName: this.item2.Other2FeeName || auralData[0].PropName
          }
        }
      },
      error => {
        console.log(error)
      }
    )
    this.lookUpsService.getLookUps(20).subscribe(
      res => {
        let theoryData = res["Data"];
        this.tempTheoryFee = Number(theoryData[1].PropName);
        this.tempOther3 = {
          Other3: {
            Other3Fee: this.item2.Other3Fee || +theoryData[1].PropName,
            Other3FeeName: this.item2.Other3FeeName || theoryData[0].PropName
          }
        }
      },
      error => {
        console.log(error)
      }
    )
    this.lookUpsService.getLookUps(16).subscribe(
      res => {
        this.noteData = res["Data"]
        this.tempNote = {
          Note: {
            NoteFee: this.item2.NoteFee || +this.noteData[1].PropName,
            LessonNoteFeeName: this.item2.LessonNoteFeeName || this.noteData[0].PropName
          }
        }
      },
      error => {
        console.log(error)
      }
    )        
  }

  checkboxOnChange(formControlName: string) {
    if (formControlName == "concertCheckBox") {
      if (this.concertInUse) {
        this.invoiceEditForm.get("Concert.ConcertFeeName").disable()
        this.invoiceEditForm.get("Concert.ConcertFee").disable()
        this.invoiceEditForm.get("Concert.ConcertFeeName").patchValue("")
        this.invoiceEditForm.get("Concert.ConcertFee").patchValue(0)
        this.owingFeeLocal -= this.tempConcertFee
      }
      if (!this.concertInUse) {
        this.invoiceEditForm.get("Concert.ConcertFeeName").enable()
        this.invoiceEditForm.get("Concert.ConcertFee").enable()
        this.invoiceEditForm.patchValue(this.tempConcert)
        this.owingFeeLocal += +this.tempConcert.Concert.ConcertFee
      }
      this.concertInUse = !this.concertInUse
    } else if (formControlName == "noteCheckBox") {
      if (this.noteInUse) {
        this.invoiceEditForm.get("Note.LessonNoteFeeName").disable()
        this.invoiceEditForm.get("Note.NoteFee").disable()
        this.invoiceEditForm.get("Note.LessonNoteFeeName").patchValue("")
        this.invoiceEditForm.get("Note.NoteFee").patchValue(0)
        this.owingFeeLocal -= this.tempNoteFee
      }
      if (!this.noteInUse) {
        this.invoiceEditForm.get("Note.LessonNoteFeeName").enable()
        this.invoiceEditForm.get("Note.NoteFee").enable()
        this.invoiceEditForm.patchValue(this.tempNote)
        this.owingFeeLocal += +this.tempNote.Note.NoteFee
      }
      this.noteInUse = !this.noteInUse
    }
    else if (formControlName == "auralCheckBox") {
      if (this.auralInUse) {
        this.invoiceEditForm.get("Other2.Other2FeeName").disable()
        this.invoiceEditForm.get("Other2.Other2Fee").disable()
        this.invoiceEditForm.get("Other2.Other2FeeName").patchValue("")
        this.invoiceEditForm.get("Other2.Other2Fee").patchValue(0)
        this.owingFeeLocal -= this.tempAuralFee
      }
      if (!this.auralInUse) {
        this.invoiceEditForm.get("Other2.Other2FeeName").enable()
        this.invoiceEditForm.get("Other2.Other2Fee").enable()
        this.invoiceEditForm.patchValue(this.tempOther2)
        this.owingFeeLocal += +this.tempOther2.Other2.Other2Fee
      }
      this.auralInUse = !this.auralInUse
    }
    else if (formControlName == "theoryCheckBox") {
      if (this.theoryInUse) {
        this.invoiceEditForm.get("Other3.Other3FeeName").disable()
        this.invoiceEditForm.get("Other3.Other3Fee").disable()
        this.invoiceEditForm.get("Other3.Other3FeeName").patchValue("")
        this.invoiceEditForm.get("Other3.Other3Fee").patchValue(0)
        this.owingFeeLocal -= this.tempTheoryFee
      }
      if (!this.theoryInUse) {
        this.invoiceEditForm.get("Other3.Other3FeeName").enable()
        this.invoiceEditForm.get("Other3.Other3Fee").enable()
        this.invoiceEditForm.patchValue(this.tempOther3)
        this.owingFeeLocal += +this.tempOther3.Other3.Other3Fee
      }
      this.theoryInUse = !this.theoryInUse
    }        
    this.setOwingFee();
  }
  getFee(feeControlName: string, groupName?: string) {
    let fee: number = 0
    if (groupName) {
      fee = +this.invoiceEditForm.get(groupName).get(feeControlName).value
    } else {
      fee = +this.invoiceEditForm.get(feeControlName).value
    }
    return fee;
  }
  setOwingFee() {
    this.owingFeeLocal = this.getFee("Other1Fee", "Other1");
    this.owingFeeLocal += this.getFee("Other2Fee", "Other2");
    this.owingFeeLocal += this.getFee("Other3Fee", "Other3");
    this.owingFeeLocal += this.getFee("Other4Fee", "Other4");
    this.owingFeeLocal += this.getFee("Other5Fee", "Other5");
    this.owingFeeLocal += this.getFee("Other6Fee", "Other6");
    this.owingFeeLocal += this.getFee("Other7Fee", "Other7");
    this.owingFeeLocal += this.getFee("Other8Fee", "Other8");
    this.owingFeeLocal += this.getFee("Other9Fee", "Other9");
    this.owingFeeLocal += this.getFee("Other10Fee", "Other10");
    this.owingFeeLocal += this.getFee("Other11Fee", "Other11");
    this.owingFeeLocal += this.getFee("Other12Fee", "Other12");
    this.owingFeeLocal += this.getFee("Other13Fee", "Other13");
    this.owingFeeLocal += this.getFee("Other14Fee", "Other14");
    this.owingFeeLocal += this.getFee("Other15Fee", "Other15");
    this.owingFeeLocal += this.getFee("Other16Fee", "Other16");
    this.owingFeeLocal += this.getFee("Other17Fee", "Other17");
    this.owingFeeLocal += this.getFee("Other18Fee", "Other18");
    this.owingFeeLocal += this.getFee("NoteFee", "Note");
    this.owingFeeLocal += this.getFee("ConcertFee", "Concert");
    this.owingFeeLocal += this.getFee("LessonFee");
  }
  feeOnChange(feeControlName: string, groupName?: string, ) {
    let fee: number = 0
    if (groupName) {
      fee = +this.invoiceEditForm.get(groupName).get(feeControlName).value
    } else {
      fee = +this.invoiceEditForm.get(feeControlName).value
    }
    console.log(fee)
    switch (feeControlName) {
      case "Other1Fee":
        this.tempOther1Fee = fee
        break;
      case "Other2Fee":
        this.tempOther2Fee = fee
        break;
      case "Other3Fee":
        this.tempOther3Fee = fee
        break;
      case "NoteFee":
        this.tempNoteFee = fee
        break;
      case "ConcertFee":
        this.tempConcertFee = fee
        break;
      case "LessonFee":
        this.tempLessonFee = fee
        break;
      case "Other4Fee":
        this.tempOther4Fee = fee
        break;
      case "Other5Fee":
        this.tempOther5Fee = fee
        break;
      case "Other6Fee":
        this.tempOther6Fee = fee
        break;
      case "Other7Fee":
        this.tempOther7Fee = fee
        break;
      case "Other8Fee":
        this.tempOther8Fee = fee
        break;
      case "Other9Fee":
        this.tempOther9Fee = fee
        break;
      case "Other10Fee":
        this.tempOther10Fee = fee
        break;
      case "Other11Fee":
        this.tempOther11Fee = fee
        break;
      case "Other12Fee":
        this.tempOther12Fee = fee
        break;
      case "Other13Fee":
        this.tempOther13Fee = fee
        break;
      case "Other14Fee":
        this.tempOther14Fee = fee
        break;
      case "Other15Fee":
        this.tempOther15Fee = fee
        break;
      case "Other16Fee":
        this.tempOther16Fee = fee
        break;
      case "Other17Fee":
        this.tempOther17Fee = fee
        break;
      case "Other18Fee":
        this.tempOther18Fee = fee
        break;
    }
    this.setOwingFee();
  }
  internalExamSet(value,item){
    if (value == "")
      this.invoiceEditForm.get(item).patchValue(0);
    else if (value == "Internal Exam")
      this.invoiceEditForm.get(item).patchValue(15);
  }
  setDiscount(i,event,item){
    // event.target.checked
    if (event.target.checked == true) {
      this.invoiceEditForm.get(item+'Name').patchValue("Discount");
      this.invoiceEditForm.get(item).patchValue(-i);
    }
    else {
      this.invoiceEditForm.get(item+'Name').patchValue("");
      this.invoiceEditForm.get(item).patchValue(0);
    }
  this.setOwingFee();
  }
  addBooks(){
    const modalRef = this.modalService
    //@ts-ignore
    .open(ModelTemplateComponent,{ size:'xl', backdrop: 'static', keyboard: false });
    let that = this;
    modalRef.result.then(
      (res) => {
        this.refreshData();
           
      },
      (err) => {
        // that.ngOnInit();
        return;
      }
    );
    modalRef.componentInstance.whichObject = {learnerId:this.item2.LearnerId,invoiceNum:this.item2.InvoiceNum};
    modalRef.componentInstance.whichModal = 'Product Payment';
  }
  refreshData(){
    this.isLoading = true;
    this.transactionService.getInvoByLearner(this.item2.LearnerId).subscribe(
      res=>{
        const invoices=res['Data'];
        const InvoiceNum = this.item2.InvoiceNum;
        const item = invoices.
          find(e=>e.InvoiceNum==InvoiceNum);
          this.item = item;
          this.ngOnInit(); 
          this.isLoading = false;
      }
      ,
      err=>{
        this.isLoading = false;
      })
  }
}
