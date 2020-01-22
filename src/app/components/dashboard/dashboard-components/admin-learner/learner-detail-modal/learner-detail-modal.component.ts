import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LearnersService } from 'src/app/services/http/learners.service';
import { environment } from 'src/environments/environment.prod';
import { ModelTemplateComponent } from '../../../../../shared/components/model-template/model-template.component'
import { AmendmentHistoryModalComponent } from '../amendment-History-modal/amendment-History-modal.component';
import { AdminInvoiceEditModalComponent } from '../../admin-transactions/admin-invoice-edit-modal/admin-invoice-edit-modal.component'
import { DownloadPDFService , IInvoiceLearnerName, IInvoice } from '../../../../../services/others/download-pdf.service'
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-learner-detail-modal',
  templateUrl: './learner-detail-modal.component.html',
  styleUrls: ['./learner-detail-modal.component.css']
})
export class LearnerDetailModalComponent implements OnInit {
  @Input() command;
  @Input() whichLearner;

  // PropNameArray:Array<any>
  public index = 0;
  public learnerPurpose: Array<any>;
  public howKnown: Array<any>;
  public Purpose: Array<any>;
  public purposeString: any;
  PropNameArray: any;
  otherValueList = [];
  howKnowList = [];
  learnerLevelList = []
  levelTypeList = []
  othersmsg = '';
  agreeFormMsg = '';
  howKnow: any
  reasonList: any
  public photoUrl: any = environment.photoUrl;
  otherFileUrl = ''
  agreeFileUrl = ''
  learnerList1: any
  errorMessage;
  loadingFlag = false;
//visible
  isVisible={timetable:true,
    missedLessons:true,
    cancelledLessons:true,
    scheduledLessons:true,
    completedLessons:true,
    invoices:true,
    payment:true,
    groupCourse:true,
    pirvateCourse:true,
    StudentInformation:true}

  //amendment列表
  amendmentList = []

  //pagination
  public currentPage: number = 1;
  public pageSize: number = 10;

  //payment
  public learnerPaymentList = []
  public paymentListLength


  //invoice pagination
  public learnerInvoiceList = []
  public invoiceListLength

  //session
  public learnerSessionList = []
  public uncompleteSession = []
  public uncompleteSessionLength
  public compeleteSession = []
  public completeSessionLength
  public cancledSession = []
  public cancledSessionLength

  // makeUp lesson
  public makeupSession=[]
  makeupSessionLength

  //Waiting Invoice
  public waitingInvoice=[]
  waitingInvoicelength

  //branch
  public org=[];

  constructor(
    public activeModal: NgbActiveModal,
    private LearnerListService: LearnersService,
     private modalService: NgbModal,
     private downloadPDFService:DownloadPDFService ) {
  }
  ngOnInit() {
    this.getData();
    this.getOthersUrl();
    this.getFormUrl();
    this.getAmendmentList();
    this.setVisiable();
  }
  setVisiable() {
    if (this.command ==6) {
        this.isVisible = {
          timetable:false,
          missedLessons:false,
          cancelledLessons:false,
          scheduledLessons:false,
          completedLessons:false,
          invoices:true,
          payment:false,
          groupCourse:false,
          pirvateCourse:false,
          StudentInformation:false}
    }
  }
  getData() {
    this.loadingFlag = true;
    let learnerListData = this.LearnerListService.getLearnerList();
    let lookUpData2 = this.LearnerListService.getLookups(2);
    let lookUpData3 = this.LearnerListService.getLookups(3);
    let lookUpData4 = this.LearnerListService.getLookups(4);
    let lookUpData5 = this.LearnerListService.getLookups(5);
    let lookUpData7 = this.LearnerListService.getLookups(7);
    let lookUpData14 = this.LearnerListService.getLookups(14);
    let learnerInvoice = this.LearnerListService.getLearnerInvoice(this.whichLearner.LearnerId)
    let learnerPayment = this.LearnerListService.getLearnerPayment(this.whichLearner.LearnerId)
    let learnerSession = this.LearnerListService.getLearnerLesson(this.whichLearner.LearnerId)
    let makeUpSession = this.LearnerListService.getMakeUpLesson(this.whichLearner.LearnerId)
    let waitingInvoice=this.LearnerListService.getWaitingInvoice(this.whichLearner.LearnerId)
    let org=this.LearnerListService.getOrgById(this.whichLearner.LearnerId);

    forkJoin([learnerListData, lookUpData2, lookUpData3, lookUpData4, lookUpData5, lookUpData7, learnerInvoice, learnerPayment, learnerSession, lookUpData14,makeUpSession,waitingInvoice,org]).subscribe(
      (res) => {
        this.loadingFlag = false;
        console.log(res)
        this.learnerList1 = res[0]['Data'];
        this.getPurposeValue(res[1]['Data'])
        this.getHowKnowValue(res[2]['Data'])
        this.getLearnerValue(res[3]['Data'])
        this.getLevelType(res[4]['Data'])

        this.learnerPaymentList = (res[7]['Data'])
        if (this.learnerPaymentList !== null) {
          this.paymentListLength = this.learnerPaymentList.length
        }
        this.paymentMethod(res[5]['Data'], this.learnerPaymentList)


        this.learnerInvoiceList = (res[6]['Data'])
        if (this.learnerInvoiceList !== null) {
          this.invoiceListLength = this.learnerInvoiceList.length
        }

        this.learnerSessionList = (res[8]['Data'])
        this.sortLearnerSession(this.learnerSessionList)

        this.paymentType(res[9]['Data'], this.learnerPaymentList)

        this.makeupSession=(res[10]['Data'])
        if(this.makeupSession !== null){
          this.makeupSessionLength=this.makeupSession.length

        this.waitingInvoice=(res[11]['Data'])
        this.sortInvoice(this.waitingInvoice);
        if(this.waitingInvoice !== null){
          this.waitingInvoicelength=this.waitingInvoice.length
        }
        this.org = (res[12]['Data']);
        }
      },

      (err) => {
        this.loadingFlag = false;
        Swal.fire({ type: 'error', title: 'Oops...', text: 'Sorry, something went wrong' + err.error.ErrorMessage });
      }
    )

  }
  sortInvoice(waitingInvoice){
    waitingInvoice.sort((a,b)=>{
      return (b.InvoiceNum+0) - (a.InvoiceNum+0)
    })
  }

  sortLearnerSession(learnerSessionList) {
    for (let i of learnerSessionList)
      if (i.IsConfirm == 0 && i.IsCanceled == 0) {
        this.uncompleteSession.push(i)
      } else if(i.IsConfirm == 1 && i.IsCanceled == 0){
        this.compeleteSession.push(i)
      } else if (i.IsCanceled == 1){
        this.cancledSession.push(i)
      }
    this.uncompleteSessionLength = this.uncompleteSession.length
    this.completeSessionLength = this.cancledSession.length
    this.cancledSessionLength = this.cancledSession.length
    console.log('111111',this.uncompleteSession)
    console.log('222222',this.compeleteSession)
    console.log('333333',this.cancledSession)
  }

  getLevelType(data) {
    data.forEach(element => {
      if (this.whichLearner.LevelType == element['PropValue']) {
        // this.levelTypeList.push(element['PropName'])
        this.whichLearner.levelTypeName = element['PropName']
      }
    });
  }

  getLearnerValue(displayData1) {
    displayData1.forEach(element => {
      if (this.whichLearner.LearnerLevel == element['PropValue']) {
        // this.learnerLevelList.push(element['PropName'])
        this.whichLearner.learnerLevelName = element['PropName']
      }
    });
    console.log(this.whichLearner)
  }

  getPurposeValue(displayDatas) {
    this.whichLearner.LearnerOthers.forEach(learnerOther => {
      // console.log(learnerOther)
      if (learnerOther.OthersType == "2") {
        displayDatas.forEach(displayData => {
          // console.log(displayData)
          if (learnerOther.OthersValue == displayData['PropValue']) {
            // console.log(displayData)
            this.otherValueList.push(displayData['PropName'])
          }
        })
      }
    })
  }

  getHowKnowValue(displayData) {
    // console.log(displayData)
    this.whichLearner.LearnerOthers.forEach(learnerOther => {
      if (learnerOther.OthersType == "3") {
        displayData.forEach(displayData => {
          // console.log(displayData)
          if (learnerOther.OthersValue == displayData['PropValue']) {
            // console.log(displayData)
            this.howKnowList.push(displayData['PropName'])
          }
        })
      }
      // console.log(this.howKnowList)
    })
  }

  paymentMethod(data, learnerPaymentList) {
    for (let i of learnerPaymentList) {
      data.forEach(element => {
        if (i.PaymentMethod == element['PropValue']) {
          // this.paymentMethodList.push(element['PropName'])
          i.paymentMethodName = element['PropName']
        }
      })
    }
  }

  paymentType(data, learnerPaymentList) {
    //  console.log(learnerPaymentList)
    for (let i of learnerPaymentList) {
      data.forEach(element => {

        if (i.PaymentType == element['PropValue']) {
          i.paymentTypeName = element['PropName']
        }
      })
    }
  }

  /*
   if photo not found, set default photo
 */
  setDefaultPhoto(event) {
    event.target.src = '../../../../../../assets/images/shared/learner-people.jpg';
    return;
  }

  setDefaultPhoto1(event) {
    event.target.src = '../../../../../../assets/images/shared/certificate-icon.png';
    return
  }

  // other files
  getOthersUrl() {
    // console.log(this.whichLearner.OtherfileUrl)
    if (this.whichLearner.OtherfileUrl !== null) {
      this.othersmsg = 'View'
      return this.otherFileUrl = this.photoUrl + this.whichLearner.OtherfileUrl;
    }
  }

  clickOtherFileUrl() {
    return window.open(this.otherFileUrl)
  }

  // agreeement Form
  getFormUrl() {
    if (this.whichLearner.FormUrl !== null) {
      this.agreeFormMsg = 'Download Enrollment Agreement Form'
      return this.agreeFileUrl = this.photoUrl + this.whichLearner.FormUrl;
    }
  }

  clickFormUrl() {
    return window.open(this.agreeFileUrl)
  }


  getAmendmentList() {
    for (let i of this.whichLearner.One2oneCourseInstance) {
      // console.log(i)
      if (i.Amendment) {
        i.Amendment.sort((b, a) => a.CreatedAt.replace(/-/gi, '').slice(0, 8) - b.CreatedAt.replace(/-/gi, '').slice(0, 8))
        // console.log(i.Amendment.sort((b, a) => a.CreatedAt.replace(/-/gi, '').slice(0, 8) - b.CreatedAt.replace(/-/gi, '').slice(0, 8)))
        for (let j of i.Amendment) {
          if (j.IsTemporary == 0) {
            i.permanent = j;
            break;
          }
        }
      }
    }
    console.log(this.whichLearner.One2oneCourseInstance)
  }

  openHistory(ele) {
    const modalRef = this.modalService.open(AmendmentHistoryModalComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.whichCourse = ele
  }
  openInvoiceEdit(item){
    const modalRef = this.modalService.open(AdminInvoiceEditModalComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false
    });
    // pass parameters to edit modals
    modalRef.componentInstance.item = item;
    var that = this;
    modalRef.result.then(
      (res) => {
        that.ngOnInit()
      },
      (err) => {
        return
      }
    )

  }
  payNow(){
    this.modalTemplate(1,this.whichLearner,"pay Invoice")
  }
  modalTemplate(command, whichLearner, title) {
    const modalRef = this.modalService
    //@ts-ignore
    .open(ModelTemplateComponent,{ size:'xl', backdrop: 'static', keyboard: false });
    let that = this;
    modalRef.result.then(
      (res) => {
        that.ngOnInit();
      },
      (err) => {
        return;
      }
    );
    modalRef.componentInstance.whichObject = whichLearner.LearnerId;
    modalRef.componentInstance.whichModal = title;
  }

  downloadPDF(allinvoice) {
    const learnerName = {} as IInvoiceLearnerName;
    let invoice;
    learnerName.firstName = allinvoice.Learner.FirstName;
    learnerName.lastName = allinvoice.Learner.LastName;
    learnerName.Email = allinvoice.Learner.Email;

    if (allinvoice.Invoice.InvoiceId == 0) {
      invoice = allinvoice.InvoiceWaitingConfirm;
    } else {
      invoice = allinvoice.Invoice;
    }

    let branch = this.org;
    this.downloadPDFService.downloadPDF(learnerName, invoice,branch )
  }
}






