import { Component, OnInit } from '@angular/core';
import { NgbootstraptableService } from 'src/app/services/others/ngbootstraptable.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LearnersService } from 'src/app/services/http/learners.service';
import { LearnerDeleteModalComponent } from '../learner-delete-modal/learner-delete-modal.component';
import { LearnerDetailModalComponent } from '../learner-detail-modal/learner-detail-modal.component';
import { LearnerEditModalComponent } from '../learner-edit-modal/learner-edit-modal.component';
import { AdminLearnerLeaveComponent } from '../admin-learner-leave/admin-learner-leave.component';
import { AdminLearnerPeriodCourseChangeModalComponent } from '../admin-learner-period-course-change-modal/admin-learner-period-course-change-modal.component';
import { LearnerAddModalComponent } from '../learner-add-modal/learner-add-modal.component';
import { LearnerDeleteCourseModalComponent } from '../learner-delete-course-modal/learner-delete-course-modal.component';
@Component({
  selector: 'app-admin-learner-profile',
  templateUrl: './admin-learner-profile.component.html',
  styleUrls: ['./admin-learner-profile.component.css']
})
export class AdminLearnerProfileComponent implements OnInit {
  //what columns showed in the info page, can get from back-end in the future. must as same as database
  public columnsToShow: Array<string> = ['FirstName', 'LastName'];

  public columnsToShow1: Array<string> = ['ContactNum', 'Email'];
  //learners data from servers
  public learnerList: Array<any>;

  //errorMessage
  errorMessage: string;

  //search by which columns, determine by users
  public columnsToSearch: string;
  public currentPage: number = 1;
  public pageSize: number = 10;
  public loadingFlag: boolean = false;
  // // sent active modal confirm satuation to admin learner component;

  // local function parameters
  public localPara = [
  {
    title: 'Student Profile',
    parameter: 1,
    class: 'fa fa-id-card'
  },
  {
    title: 'Edit Student Profile',
    parameter: 2,
    class: 'fas fa-pen'
  },
  {
    title: 'Book a Course',
    parameter: 0,
    class: 'fas fa-folder-plus'
  },
  {
    title: 'Quit a Course',
    parameter: 4,
    class: 'fas fa-folder-minus'
  },
  {
    title: 'Ask for Leave',
    parameter: 9,
    class: 'fas fa-bed'
  },
  {
    title: 'Change Schedule',
    parameter: 10,
    class: 'fas fa-calendar'
  },
  {
    title: 'Delete Student Record',
    parameter: 3,
    class: 'fas fa-trash-alt'
  },
]
  // @Output() activeModalEvent: EventEmitter<any> = new EventEmitter;
  // activeSubmitted: boolean = false;
  constructor(
    private LearnerListService: LearnersService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.loadingFlag = true;
    this.getDataFromServer()
  }

  //get data from server
  getDataFromServer() {
    this.LearnerListService.getLearnerList().subscribe(
      (res) => {
        //@ts-ignore
        this.learnerList = res.Data;
        this.loadingFlag = false;
      },
      (err) => {
        console.log(err); this.errorMessage = "Wrong"
      }
    )
  }


  ///////////////////////////////////////handler of angular-bootstrap modals/////////////////////////////////////
  /*
    pop up modals, when need to pop up a modal, call this method
    commands:
      0 --> Add new
      1 --> show details/show more
      2 --> Edit/update
      3 --> delete
  */
  popUpModal(command) {
    let whichLearner = this.learnerList[0];
    switch (command) {
      case 0:
        this.addModal(command, whichLearner)
        break;
      case 1:
        this.detailModal(command, whichLearner)
        break;
      case 2:
        this.EditModal(command, whichLearner)
        break;
      case 3:
        this.deleteModal(command, whichLearner);
        break;
      case 4:
        this.deleteCourseModal(whichLearner);
        break;
      case 9:
        this.leaverModal(command, whichLearner);
        break;
      case 10:
        this.periodCourseChangeModal(command, whichLearner);
    }
  }

  leaverModal(command, whichLearner) {
    const modalRef = this.modalService.open(AdminLearnerLeaveComponent, { size: 'lg' });
    modalRef.componentInstance.learner = whichLearner;
    let that = this;
    modalRef.result.then(
      (res) => {
        that.ngOnInit()
      },
      (err) => {
        return
      }
    )
  }

  periodCourseChangeModal(cammand, whichlearner) {
    const modalRef = this.modalService.open(AdminLearnerPeriodCourseChangeModalComponent, { size: 'lg' });
    modalRef.componentInstance.learner = whichlearner;
    let that = this;
    modalRef.result.then(
      (res) => {
        that.ngOnInit()
      },
      (err) => {
        return
      }
    )
  }
  /*
    delete modal
  */
  deleteModal(command, whichLearner) {
    const modalRef = this.modalService.open(LearnerDeleteModalComponent);
    let that = this;
    modalRef.result.then(
      (res) => {
        that.ngOnInit()
      },
      (err) => {
        return
      }
    )
    modalRef.componentInstance.command = command;
    modalRef.componentInstance.whichLearner = whichLearner;
  }

  /*
    detail modal
  */
  detailModal(command, whichLearner) {
    const modalRef = this.modalService.open(LearnerDetailModalComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.command = command;
    modalRef.componentInstance.whichLearner = whichLearner;
  }
  /*
    Edit modal
  */
  EditModal(command, whichLearner) {
    const modalRef = this.modalService.open(LearnerEditModalComponent, { windowClass: 'my-class', backdrop: 'static', keyboard: false });

    let that = this;
    modalRef.result.then(
      (res) => {
        that.ngOnInit()
      },
      (err) => {
        return
      }
    )
    modalRef.componentInstance.command = command;
    modalRef.componentInstance.whichLearner = whichLearner;
  }

  /*
    jump to another page
  */
  jumpToTrialCoursePage() {
    history.pushState(null, '', 'trial')
  }

  /*
    Add courses modal
  */
  addModal(command, whichLearner) {
    const modalRef = this.modalService.open(LearnerAddModalComponent, { windowClass: 'my-class', backdrop: 'static', keyboard: false });
    let that = this;
    modalRef.result.then(
      (res) => {
        this.ngOnInit()
      },
      (err) => {
        return
      }
    )
    modalRef.componentInstance.command = command;
    modalRef.componentInstance.whichLearner = whichLearner;
    modalRef.componentInstance.signalForInit.subscribe(res => {
      if (res == true) {
        that.ngOnInit();
      }
    })
  }
  deleteCourseModal(whichLearner) {
    const modalRef = this.modalService.open(LearnerDeleteCourseModalComponent, { windowClass: 'my-class', backdrop: 'static', keyboard: false });

    let that = this;
    modalRef.result.then(
      (res) => {
        that.ngOnInit()
      },
      (err) => {
        return
      }
    )
    modalRef.componentInstance.whichLearner = whichLearner;
  }
}

