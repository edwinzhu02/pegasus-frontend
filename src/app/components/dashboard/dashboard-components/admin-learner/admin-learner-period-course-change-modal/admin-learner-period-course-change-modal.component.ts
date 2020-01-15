import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbActiveModal, NgbModal, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import {timePickerValidator} from '../../../../../shared/time-picker.validators';
import {LearnersService} from '../../../../../services/http/learners.service';
import { CoursesService } from '../../../../../services/http/courses.service';
import {PeriodCourseDurationChange} from '../../../../../models/PeriodCourseDurationChange';
import Swal from 'sweetalert2';
import { TimePickerComponent } from '../../time-picker/time-picker.component';
import { LearnerRegistrationModalComponent } from '../../learner-registration/learner-registration-modal/learner-registration-modal.component';
import { exists } from 'fs';
import { LearnerRegistrationConfirmModalComponent } from '../../learner-registration/learner-registration-confirm-modal/learner-registration-confirm-modal.component';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-admin-learner-period-course-change-modal',
  templateUrl: './admin-learner-period-course-change-modal.component.html',
  styleUrls: ['./admin-learner-period-course-change-modal.component.css']
})
export class AdminLearnerPeriodCourseChangeModalComponent implements OnInit {
  errorMessage;
  IsformError = false;
  isEditSuccess = false;
  isEditFail = false;
  isloading = false;
  isConfirmClick = false;
  learner;
  Orgs;
  Teachers;
  PeriodCourseChangeForm;
  modalRefTimePicker;
  public fd=new FormData;
  isSpecifiedTime:number=1;
  
  @Input() whichLearner;
  @Output() toLearnerListEvent: EventEmitter<any> = new EventEmitter;
  teaList: any;
  searchValue: any;
  customCourse: { "location": any; "beginDate":any;"DayOfWeek":any,"Duration":any, "DurationName":any};
  myDate: () => string;
  toDatePickCourseDuration: {"DurationName":any,"Duration":any,};
  durationlist=new Array();
  modalRefConfirm: any;
  addCourse: any;
  // modalRefTimePicker: any;
  // timePickArrayNumber: any;
  // teaListOutArray: any;
  // registrationForm: any;

  // allBranchTeachers: any;


  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
              private service: LearnersService,private modalService: NgbModal,
              private coursesService: CoursesService) { }

  ngOnInit() {
    
    this.GetOrg();
    this.getDate();
    console.log(this.learner);
    
    this.PeriodCourseChangeForm = this.fb.group({
      BeginDate: [this.myDate(), Validators.required],
      EndDate: ['', Validators.required],
      BeginTime: ['', [Validators.required, timePickerValidator]],
      reason: ['', Validators.required],
      instanceId: ['', Validators.required],
      OrgId: ['', Validators.required],
      DayOfWeek: ['', Validators.required],
      IsTemporary: ['', Validators.required],
      CourseScheduleId: ['', Validators.required],
      TeacherId: ['', Validators.required],
      allBranchTeachers: new FormControl()
      // Time: ['', Validators.required]      
    });
    
  }
  getDate() {
    this.myDate = () => {
      const Dates = new Date();
      const year: number = Dates.getFullYear();
      const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
//      console.log( Dates, year, month,)
      return year + '-' + month + '-' + day;
    };
  }

  get BeginDate() {
    return this.PeriodCourseChangeForm.get('BeginDate');
  }

  get BeginTime() {
    return this.PeriodCourseChangeForm.get('BeginTime');
  }

  get OrgId() {
    return this.PeriodCourseChangeForm.get('OrgId');
  }

  get DayOfWeek() {
    return this.PeriodCourseChangeForm.get('DayOfWeek');
  }

  get IsTemporary() {
    return this.PeriodCourseChangeForm.get('IsTemporary');
  }

  get reason() {
    return this.PeriodCourseChangeForm.get('reason');
  }

  get instanceId() {
    return this.PeriodCourseChangeForm.get('instanceId');
  }

  get TeacherId() {
    return this.PeriodCourseChangeForm.get('TeacherId');
  }
  get CourseScheduleId() {
    return this.PeriodCourseChangeForm.get('CourseScheduleId');
  }
  // get IsInvoiceChange() {
  //   return this.PeriodCourseChangeForm.get('IsInvoiceChange');
  // }

  get allBranchTeachers() {
    return this.PeriodCourseChangeForm.get('allBranchTeachers');
  }
 

  GetOrg = () => {
    this.service.GetOrgRoom().subscribe(res => {
      // @ts-ignore
      this.Orgs = res.Data;
    }, err => {
      console.log(err);
    });
  }
  changeMode(value){
    this.Teachers = [];
    this.isSpecifiedTime = parseInt(value);
    if (!this.isSpecifiedTime){
      
      if(this.PeriodCourseChangeForm.value.allBranchTeachers){
        this.GetAllBranchTeachersForSpecifiedTime();
      }
      else{
        this.GetTeachersForSpecifiedTime();
      }
    }

  }
  GetTeachersForSpecifiedTime = () => {
    this.Teachers = [];
    this.service.GetTeacherByOrg(this.PeriodCourseChangeForm.get('OrgId').value)
      .subscribe(res => {
        this.Teachers = res['Data'];
        // this.teaList=this.Teachers[0].Teacher;
      }, err => {
        console.log(err);
      });
  }

  GetAllBranchTeachersForSpecifiedTime = () => {

      this.coursesService.getOrgs().subscribe((res) => {
        // let outData = [];


        let funArr = [];

        // console.log(res);
        res['Data'].forEach(e => {
          // outData.push({
          //   id: e['OrgId'], 
          //   title: e['OrgName']});

          console.log(e['OrgId']);

            funArr.push(this.service.GetTeacherByOrg(e['OrgId']));
        });


        forkJoin(...funArr).subscribe(
          (res) => {
            console.log(res);
            // allData = res[0].Data


            this.Teachers = [];
            for (var i = 0; i < res.length; i ++) {
            ​
              console.log(res[i].Data); // 1, "string", false
              // let teaData = res[i].Data

              res[i].Data.forEach(e => {
                this.Teachers.push(e);
              });

              
            }     
            // this.loadingFlag = false;

            console.log(this.Teachers);

          },
          (err) => {
            console.log(err);
            alert('Sorry, something went wrong.' + err)
          })    


  
        // this.service.GetTeacherByOrg(this.PeriodCourseChangeForm.get('OrgId').value)
        // .subscribe(res => {
        //   this.Teachers = res['Data'];
        //   // this.teaList=this.Teachers[0].Teacher;
        // }, err => {
        //   console.log(err);
        // }); 

      },
      err => {
        this.isloading = false;
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.error.ErrorMessage
        });
      });   



    // this.service.GetTeacherByOrg(this.PeriodCourseChangeForm.get('OrgId').value)
    //   .subscribe(res => {
    //     this.Teachers = res['Data'];
    //     // this.teaList=this.Teachers[0].Teacher;
    //   }, err => {
    //     console.log(err);
    //   });
  }
  
  submit = () => {
    if (this.PeriodCourseChangeForm.invalid) {
      this.checkInputVailad();
      this.errorMessage = 'The form is Invalid';
      this.IsformError = true;
      return;
    }
    this.IsformError = false;
    this.isloading = true;
    this.isConfirmClick = true;
    const model = new PeriodCourseDurationChange(
      localStorage.getItem('userID'), this.learner.LearnerId, this.PeriodCourseChangeForm.value.BeginDate,
      this.PeriodCourseChangeForm.value.EndDate,
      this.PeriodCourseChangeForm.value.reason, this.PeriodCourseChangeForm.value.instanceId, this.PeriodCourseChangeForm.value.OrgId,
      this.PeriodCourseChangeForm.value.DayOfWeek, this.PeriodCourseChangeForm.value.BeginTime, this.PeriodCourseChangeForm.value.EndTime,
      1, this.PeriodCourseChangeForm.value.IsTemporary,
      this.PeriodCourseChangeForm.value.CourseScheduleId, this.PeriodCourseChangeForm.value.TeacherId
    )
    this.service.PeriodCourseChange(model).subscribe(res => {
      this.isEditFail = false;
      this.isloading = false;
      this.isEditSuccess = true;
    }, err => {
      this.isConfirmClick = false;
      this.isEditFail = true;
      this.isloading = false;
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: err.error.ErrorMessage,
      });
    });
  }

  checkInputVailad = () => {
    for (let i in this.PeriodCourseChangeForm.controls) {
      this.PeriodCourseChangeForm.controls[i].touched = true;
    }
  }

  CourseRadioButtonChange = () => {
    this.PeriodCourseChangeForm.patchValue({
      CourseScheduleId: null
    });
    //console.log(this.learner.One2oneCourseInstance);
    
  }

  ScheduleRadioButtonChange = (courseInstanceId) => {
    this.PeriodCourseChangeForm.patchValue({
      instanceId: courseInstanceId
    });
    
   // console.log(courseInstanceId);
    
    let duration;
    this.service.getLookups(8).subscribe(res=>{
         
         this.durationlist=res.Data;
         for(let i=0;i<this.learner.One2oneCourseInstance.length;i++){
            //console.log(this.learner.One2oneCourseInstance[i]);
            if(this.learner.One2oneCourseInstance[i].CourseInstanceId==courseInstanceId){
                duration=this.learner.One2oneCourseInstance[i].Course.Duration;
               
                
                for(let i=0;i<this.durationlist.length;i++){
                   if(this.durationlist[i].PropValue==duration){
                        this.toDatePickCourseDuration={"DurationName":this.durationlist[i].PropName,
                      "Duration":duration};
                        console.log(this.toDatePickCourseDuration);
                    }
                }   
              //this.selectTeacher;
              // console.log(this.teaList);
              this.teaList=this.teaList.concat(this.toDatePickCourseDuration);
             // this.teaList.push(i-1);
              console.log(this.teaList);
              
              
            }
          }
        },err=>{
          console.log('wrong message')
        });
    ;
    //     console.log(this.learner[i].One2oneCourseInstance.course.price);
    //     break;
    //   }
    // }
  }

  IsTemporaryChange = () => {
    if (this.PeriodCourseChangeForm.value.IsTemporary == 0) {
      this.PeriodCourseChangeForm.get('EndDate').reset();
      this.PeriodCourseChangeForm.get('EndDate').disable();
    } else {
      this.PeriodCourseChangeForm.get('EndDate').enable();
    }
  }

  GetTeachers = () => {
    let testlist=[];
    if (!this.isSpecifiedTime) {
      this.GetTeachersForSpecifiedTime();
      return;
    }
    if (!this.OrgId.invalid && !this.DayOfWeek.invalid) {
      this.service.GetTeacherRoomByOrgDayOfWeek(this.PeriodCourseChangeForm.get('OrgId').value, this.PeriodCourseChangeForm.get('DayOfWeek').value)
        .subscribe(res => {
          // @ts-ignore
          this.Teachers = res.Data;
          // this.teaList=this.Teachers[0].Teacher;
          
      }, err => {
        console.log(err);
      });
    }
  }
  selectTeacher(id){
    // this.teaList=[];
    // console.log(this.Teachers);
    // for(let i=0; i<this.Teachers.length;i++){
    //   if(this.Teachers[i].Teacher.TeacherId==this.searchValue){
    //     //console.log(this.Teachers[i].Teacher);
    //     this.teaList.push(this.Teachers[i]);
    //   }    
    
    // }
    // console.log(this.searchValue);
    // console.log(this.teaList);
    this.teaList=this.Teachers;
    this.teaList = this.teaList.filter((item)=> item.TeacherId == Number(id));
    //this.teaList = this.teaList.concat(this.toDatePickCourseDuration);
    //
    
    //this.teaList.push(this.Teachers.TeacherId);
    
    console.log(this.teaList);
    
  }
  
  open(){
    this.modalRefTimePicker=this.modalService.open(LearnerRegistrationModalComponent,{ windowClass: 'my-class'});
    if (this.isSpecifiedTime)
      this.customCourse = {"location":this.OrgId.value,"beginDate":this.BeginDate.value,
        "DayOfWeek":this.DayOfWeek.value, "Duration": this.toDatePickCourseDuration["Duration"], "DurationName": this.toDatePickCourseDuration["DurationName"]};
      else
      this.customCourse = {"location":this.OrgId.value,"beginDate":this.BeginDate.value,
      "DayOfWeek":undefined, "Duration": this.toDatePickCourseDuration["Duration"], "DurationName": this.toDatePickCourseDuration["DurationName"]};      


    console.log(this.BeginDate.value);
    console.log(this.customCourse);
    console.log(this.teaList);
    this.modalRefTimePicker.componentInstance.customCourse = this.customCourse;
    this.modalRefTimePicker.componentInstance.teaList = this.teaList;//this.teaListOutArray[i].teaListToDatePick;
    this.modalRefTimePicker.componentInstance.isSpecifiedTime = this.isSpecifiedTime; 

  // this.timePickArrayNumber = i;
  this.modalRefTimePicker.componentInstance.beginTimeTo.subscribe(
    (res) =>{
      this.getTimePickerInfo(res);
    },
    (err) => {
      console.log(err)
    }
  )

}
getTimePickerInfo(time){
   console.log(time)
   let timeArray = time.BeginTime.split(':');
   let dayOfWeek = time.DayOfWeek
   let day
   switch (dayOfWeek){
      case 'Monday':
         day = '1';
         break;
      case 'Tuesday':
         day = '2';
         break;
      case 'Wednesday':
        day = '3';
        break;
      case 'Thursday':
        day = '4';
        break;
      case 'Friday':
         day = '5';
         break;
      case 'Saturday':
        day = '6';
        break;
       case 'Sunday':
         day = '7';
         break;
    }
    // let timeTrans: NgbTimeStruct = { hour: Number(timeArray[0]), minute: Number(timeArray[1]), second: 0 };
    // this.learner.patchValue({
    //   schedule: { beginTime: timeTrans, dayOfWeek: day, durationType:''}
    // });
    
    // this.PeriodCourseChangeForm.patchValue({

    // })
    
    
    
    console.log(this.PeriodCourseChangeForm);
    
    this.PeriodCourseChangeForm.patchValue({BeginTime:time.BeginTime.toString().replace(' ','').replace(' ',''), DayOfWeek:day})


    if(this.isSpecifiedTime){
      this.PeriodCourseChangeForm.patchValue({TeacherId: time.TeacherId});
    }
    
  }

selectAllTeacherClicked(event){
  // console.log(this.PeriodCourseChangeForm.value.allBranchTeachers);

  if(event.target.checked){
    this.GetAllBranchTeachersForSpecifiedTime();
  }
  else{
    this.GetTeachersForSpecifiedTime();
  }
}

// updateSelection($event, id){
//   　　var checked = $event.target;
//   　　if(checked.checked){
//   // 　　　　addcheckArr.push(checked.value);
//   　　}else{
//   // 　　　　addcheckArr.splice(checked.id,1);
//   　　};
// }

// selectLearnerPurpose(i, event) {
//   this.learnerPurpose[i].isChecked = event.target.checked;
//   this.confirmLearner();
// }

  openConfirm() {
    console.log(this.addCourse)
    this.modalRefConfirm = this.modalService.open(LearnerRegistrationConfirmModalComponent,{backdrop:'static', keyboard:false});
    // this.modalRefConfirm.componentInstance.fdObj = this.fd;
    // if (this.whichLearner && !this.addCourse){
    //   this.modalRefConfirm.componentInstance.command = 2;  //edit
    //   this.modalRefConfirm.componentInstance.learnerId = this.whichLearner.LearnerId;
    // } else if (this.addCourse){
    //   this.modalRefConfirm.componentInstance.command = 3; //add
    //   // this.modalRefConfirm.componentInstance.groupCourse = this.groupCourseForSubmit;
    //   // this.modalRefConfirm.componentInstance.isGroupCourse = this.isGroupCourse;
    //   // this.modalRefConfirm.componentInstance.oneOnOneCourse = this.oneOnOneCourse;
    //   this.modalRefConfirm.componentInstance.learnerId = this.whichLearner.LearnerId;
    //   this.modalRefConfirm.componentInstance.addCourse = this.addCourse;
    // }
    // else
    //   this.modalRefConfirm.componentInstance.command = 1;   //post
    //   this.modalRefConfirm.componentInstance.clickConfirm.subscribe(res=>{
    //     console.log(res)
    //     if (res == true) {
    //       this.toLearnerListEvent.emit(true);
    //     }

    
    //   })

  }
  
}
