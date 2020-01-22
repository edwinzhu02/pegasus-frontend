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
import { NewLearnerRegistrationModalComponent } from '../New-Learner-Registration-modal/New-Learner-Registration-modal.component';
import { RegistrationToParentComponent } from '../registration-To-parent/registration-To-parent.component';
import { LearnerRegistrationFormComponent } from '../../learner-registration/learner-registration-form/learner-registration-form.component'
import { LearnerAddModalTestComponent } from '../learner-add-modal-test/learner-add-modal-test.component';
import { instrumentIcon } from 'src/environments/environment.prod';
@Component({
  selector: 'app-admin-learner-list',
  templateUrl: './admin-learner-list.component.html',
  styleUrls: ['./admin-learner-list.component.css']
})
export class AdminLearnerListComponent implements OnInit {
  //what columns showed in the info page, can get from back-end in the future. must as same as database
  public columnsToShow: Array<string> = ['FirstName', 'LastName'];

  public columnsToShow1: Array<string> = ['ContactNum','Email'];//, 
  //learners data from servers
  public learnerList: Array<any>;

  //learner list copy. Using in searching method, in order to initialize data to original
  public learnerListCopy: Array<any>;

  //how many datas in learnerList
  public learnerListLength: number;

  //errorMessage
  errorMessage: string;

  //search by which columns, determine by users
  public columnsToSearch: string;
  public currentPage: number = 1;
  public pageSize: number = 10;
  public loadingFlag: boolean = false;
  // save users searched name
  public savedName;
  public savedOpt;
  //default only list current branch student ,if checked list all student;
  public allStudentsOption:boolean = false;
  public isFilter:boolean = false;
  // // sent active modal confirm satuation to admin learner component;

  // @Output() activeModalEvent: EventEmitter<any> = new EventEmitter;
  // activeSubmitted: boolean = false;
  constructor(
    private LearnerListService: LearnersService,
    private ngTable: NgbootstraptableService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.loadingFlag = true;
    this.getDataFromServer();
  }
  ngOnInit2(learner) {
    this.loadingFlag = true;
    console.log(learner);
    this.getOneLearner(learner);
  }
  //get data from server
  getDataFromServer() {
    // console.log('ajfoi')
    this.LearnerListService.getLearnerList().subscribe(
      (res) => {
        //@ts-ignore
        this.learnerList = res.Data;
        this.addColStatus(this.learnerList );
        this.learnerList = this.filterLearner(this.learnerList);
        //@ts-ignore
        this.learnerListCopy = this.learnerList;
       
        //@ts-ignore
        this.learnerListLength = this.learnerList.length;
        this.loadingFlag = false;
        this.searchAuto();
      },
      (err) => {
        console.log('b')
        console.log(err); this.errorMessage = "Wrong"
      }
    )
  }
  getOneLearner(learner){
    this.LearnerListService.getLearnerById(learner.LearnerId).subscribe(
      (res) => {
        learner = res['Data']
      },
      (err)=>{}
    )
  }
  /*
    sort method
  */
  onSort(orderBy) {
    let orderControl = this.ngTable.sorting(this.learnerList, orderBy);

  }

  /*
     search method
   */
  onSearch(event, initValue?) {
    if (event !== null && !(event.type == 'keydown' && event.key == 'Enter')) {
      return;
    }
    else {
      let searchString: string;
      let searchBy: string;
      let searchingInputObj = document.getElementById('searchingInput');
      let optionsObj = document.getElementById('searchOption');
      this.savedName = searchingInputObj['value'];
      this.savedOpt = optionsObj['value'];
      (initValue == undefined) ? { searchString, searchBy } = { searchString: this.savedName, searchBy: optionsObj['value'] } :
        { searchString, searchBy } = initValue;

      this.learnerList = this.ngTable.searching(this.learnerListCopy, searchBy, searchString);
      this.learnerList = this.filterLearner(this.learnerList);
      this.learnerListLength = this.learnerList.length;
      optionsObj['value'] = searchBy;
    }
  }
  // get memory of user searched name
  searchAuto(){
    if(this.savedName){
      this.learnerList = this.ngTable.searching(this.learnerListCopy, this.savedOpt, this.savedName);
      this.savedOpt = this.savedOpt;
    }
    this.learnerList = this.filterLearner(this.learnerList);    
    this.learnerListLength = this.learnerList.length;
  }

  /*
     Insert space before capital letter.
       eg: FirstName --> First Name
   */
  AddSpaceInString(strToAdd) {
    return strToAdd.replace(/(?=[A-Z])/g, ' ');
  }

  /*
     let user decide in which column to search
   */
  showSearchingSelection(event) {
    let dropDownObj = document.getElementById('t_info_search_by_btn');
    event.target.attributes.flag = !event.target.attributes.flag;

    if (event.target.attributes.flag == true) {
      let searchingInputObj = document.getElementById('searchingInput');
      searchingInputObj['value'] = null;
      dropDownObj.style.display = 'inline-block';
    }
    else {
      dropDownObj.style.display = 'none';
    }
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
  popUpModal(command, whichLearner) {
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
        break;
      case 11:
        this.addModalTest(command,whichLearner);
        break;

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
    //@ts-ignore
    const modalRef = this.modalService.open(LearnerDetailModalComponent, { size: 'xl', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.command = command;
    modalRef.componentInstance.whichLearner = whichLearner;
  }
  /*
    Edit modal
  */
  EditModal(command, whichLearner) {
    //@ts-ignore
    const modalRef = this.modalService.open(LearnerEditModalComponent, { size: 'xl', backdrop: 'static', keyboard: false });

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
    modalRef.componentInstance.signalForInit.subscribe(res => {
      if (res == true) {
        that.ngOnInit();
      }
    })

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
        that.ngOnInit()
      },
      (err) => {
        return;
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
  addModalTest(command, whichLearner) {
    const modalRef = this.modalService.open(LearnerAddModalTestComponent, { windowClass: 'my-class', backdrop: 'static', keyboard: false });
    let that = this;
    modalRef.result.then(
      (res) => {
        that.ngOnInit()
      },
      (err) => {
        return;
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

  newRegiModal(command,whichLearner) {
    //@ts-ignore
    const modalRef = this.modalService.open(NewLearnerRegistrationModalComponent, { size: 'xl', backdrop: 'static', keyboard: false });

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
    modalRef.componentInstance.refreshFlag.subscribe(res => {
      if (res == true) {
        that.ngOnInit();
      }
    })

  }

  regiModal(command,whichLearner) {
    //@ts-ignore
    const modalRef = this.modalService.open(LearnerRegistrationFormComponent, { size: 'xl', backdrop: 'static', keyboard: false });

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
    modalRef.componentInstance.refreshFlag.subscribe(res => {
      if (res == true) {
        that.ngOnInit();
      }
    })

  }

  openRegModal(command, whichLearner) {
    //@ts-ignore
    const modalRef = this.modalService.open(NewLearnerRegistrationModalComponent, { size: 'xl', backdrop: 'static', keyboard: false });
    let that = this;
    modalRef.componentInstance.command = command;
    modalRef.componentInstance.whichLearner = whichLearner;
    modalRef.componentInstance.refreshFlag.subscribe(
      (res) => {
        modalRef.result.then(
          function () {
            if (res == true) {
              that.ngOnInit();
            }
          },
          function () {
            return;
          })
      }
    )
  }

  openParentModal(command,whichLearner){
    //@ts-ignore
    const modalRef = this.modalService.open(RegistrationToParentComponent, { size: 'xl', backdrop: 'static', keyboard: false });
    let that = this;
    modalRef.componentInstance.command = command;
    modalRef.componentInstance.whichLearner = whichLearner;
    modalRef.componentInstance.refreshFlag.subscribe(
      (res) => {
        modalRef.result.then(
          function () {
            if (res == true) {
              that.ngOnInit();
            }
          },
          function () {
            return;
          })
      }
    )    
  }
  getBranch(){
    let orgIds  = localStorage.getItem("OrgId");
    return orgIds
  }
  filterLearner(learners){
    if (this.allStudentsOption) return learners;
    let orgIds = this.getBranch()
    return learners.filter(learner => {
      return orgIds.includes(learner.OrgId);
    });
  }
  onFilter(event){

    this.learnerList = this.teacherFiler(event.teacherId,this.learnerListCopy);
    this.learnerList = this.branchFiler(event.branchId,this.learnerList);
    this.learnerList = this.courseFiler(event.courseTypeId,this.learnerList);
    this.learnerList = this.instrumentFiler(event.instrumentId,this.learnerList);
    this.learnerListLength = this.learnerList.length;
  }
  teacherFiler(teacherId,learners){
    if (teacherId==-1) return learners;
    return learners.filter(learner => {
      if (learner.One2oneCourseInstance==undefined &&
        learner.One2oneCourseInstance==null)
        return false;
      // return learner.One2OneCourseInstance.include;
      return (
        
        learner.One2oneCourseInstance.find( 
             courseInstance  => courseInstance.TeacherId
                == teacherId
          ) != undefined);
    });
  }
  branchFiler(branchId,learners){
    if (branchId==-1) return learners;
    return learners.filter(learner => {
      return learner.OrgId==branchId;
    });
  }
  courseFiler(courseTypeId,learners){
    if (courseTypeId==-1) return learners;
    
    return learners.filter(learner => {
      if (courseTypeId ==1){
        if (learner.One2oneCourseInstance!=null &&learner.One2oneCourseInstance.length >0)
        return true;
      }
      else{
        if (learner.LearnerGroupCourse!=null &&learner.LearnerGroupCourse.length>0)
          return true;
      }
      return false;
    });
  }
  instrumentFiler(instrumentId,learners){
    if (instrumentId==-1) return learners;
    return learners.filter(learner => {
      if (learner.One2oneCourseInstance==undefined &&
        learner.One2oneCourseInstance==null)
        return false;
      // if (learner.LearnerId !=10069) return false;
      return (
        
        learner.One2oneCourseInstance.find( 
             Course  => Course.Course.CourseCategoryId
                == instrumentId
          ) != undefined);
    });
  }
  addColStatus(leaners){
    leaners.forEach(learner => {
      let courseIcon=[];
      learner.One2oneCourseInstance.forEach(courseInstance=>{
        if (courseInstance.EndDate==null
          ||courseInstance.EndDate > new Date().toISOString())
          courseIcon.push(this.getCourseIcon(courseInstance.Course.CourseCategoryId));
      })
      // learner.One2oneCourseInstance.CourseId
      // learner.One2oneCourseInstance.Course.CourseCategoryId
      // learner.One2oneCourseInstance.EndDate
      if (learner.LearnerGroupCourse.length >0){
        courseIcon.push(this.getCourseIcon(0));
      }
      // courseIcon.
      // learner.InstrumentIcon
      learner.InstrumentIcon = courseIcon.filter((x, i, a) => a.indexOf(x) == i)
    });
  }
  getCourseIcon(CourseCategoryId){
    return '../../../../../../'+instrumentIcon[CourseCategoryId].url;
  }
}
