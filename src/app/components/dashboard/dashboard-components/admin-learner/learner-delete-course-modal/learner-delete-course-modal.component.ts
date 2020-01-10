import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LearnerRegistrationService } from '../../../../../services/http/learner-registration.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-learner-delete-course-modal',
  templateUrl: './learner-delete-course-modal.component.html',
  styleUrls: ['./learner-delete-course-modal.component.css']
})
export class LearnerDeleteCourseModalComponent implements OnInit {
  isGroupCourse = false;
  @Input() whichLearner;
  groupEndDate;
  one2OneEndDate;
  groupEndArray = [];
  ono2OneEndArray = [];
  dateForm;
  currentDate:string;

  constructor(public activeModal: NgbActiveModal, private endCourse: LearnerRegistrationService, private fb: FormBuilder) {
    this.dateForm = this.fb.group({
    groupDateForm: this.fb.array([]),
    ono2OneDateForm: this.fb.array([])
  });
  this.currentDate = new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2)
  // var today = new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2)

  }



  get groupArray(): FormArray { return this.dateForm.get('groupDateForm');}
  get ono2OneArray(): FormArray { return this.dateForm.get('ono2OneDateForm');}

  // createForm(){
  //   this.dateForm = this.fb.group({
  //     groupDateForm: this.fb.array([]),
  //     ono2OneDateForm: this.fb.array([])
  //   });
  // }

  chooseCourse() {
    this.isGroupCourse = !this.isGroupCourse;
  }

  getCourse() {
    this.whichLearner.LearnerGroupCourse.forEach(ele => {
      this.groupArray.push(
        this.fb.group({
          GroupEnd: '',
        })
      );
    });
    this.whichLearner.One2oneCourseInstance.forEach(ele => {
      this.ono2OneArray.push(
        this.fb.group({
          OneEnd: '',
        })
      );
    });
  }

  changeGroupDate(event,i){
    console.log(this.groupArray.controls[i], i, event);
    this.groupArray.controls[i].patchValue({
      GroupEnd: event.target.value,
    });
    console.log(this.groupArray);
  }

  onSubmit(ele,i){
    let fun;

    if (this.ono2OneArray.controls[i].value.OneEnd >ele.EndDate ){
      Swal.fire({
        title: 'Error!',
        text: 'Input date must be before the end date of the course',
        type: 'error',
      });
      return;
    }
    if(this.isGroupCourse){
      let idIns = ele.GroupCourseInstanceId;
      fun = this.endCourse.endGroupCourse(idIns, this.groupArray.controls[i].value.OneEnd);
    } else{
      let idIns = ele.CourseInstanceId
      fun = this.endCourse.end121Course(idIns, this.ono2OneArray.controls[i].value.OneEnd);
    }
    fun.subscribe(
      res => {
        Swal.fire({
          title: 'Success!',
          text: 'Your Work Has Been Save',
          type: 'success',
        });
      },
      error => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'Sorry! '+ error.error.ErrorMessage,
          type: 'error',
        });
      });
  }
  onChangeChourse(ele,i){
    console.log(ele,i);
    this.getCourseForTeacher(ele.TeacherId);

  }
  getCourseForTeacher(teacherId){
    this.endCourse.getCourseByTeacher(teacherId).subscribe(
      res=>{
        let course = res['Data'];
        console.log(res);
        course = course.map(e=>{
          console.log(e.CourseId,e.CourseName)
          //return e.CourseId,e.CourseName
          return  {id:e.CourseId , name:e.CourseName }
        })
        console.log(course);
        this.changeDialog(course);
      },
      err=>{
        Swal.fire({
          type: 'error',
          html: 'Error occur ' + err.toString()
        })
        
      }
    )
  }
  convertOptions(options){
    let opt={};
    options.forEach(e=>{
      console.log(e);
      opt[e.id]=e.name;
    })
    return opt;
  }
   changeDialog(options){
     console.log(options);
     options = this.convertOptions(options);
    // this.
  console.log(options);
    Swal.fire({
      title: 'Please Input',
      html:'Change Begin Date:<input type="date" id="swal-input1" class="swal2-input">Select a Course:',
     input: 'select',
     inputOptions:options,
      inputPlaceholder: 'Select a Course',
     showCancelButton: true,
     preConfirm: (data) => {
       console.log(data);
      return {'course':data,
        // document.getElementById('swal-input1').value ,
        'date':document.getElementById('swal-input1')['value']}
    }
      }).then(res=>{
       // this.ChangeCourse(res);
        console.log(res);
      })
  }
  
  GetLearner() {
    this.endCourse.getLearnerById(this.whichLearner.learnerId).subscribe(
      res=>{
        this.whichLearner=res['Data'];
      },
      err=>{}
    )
  }
  ngOnInit() {
    // this.createForm();
    this.getCourse();
    console.log(this.dateForm)
  }

}
