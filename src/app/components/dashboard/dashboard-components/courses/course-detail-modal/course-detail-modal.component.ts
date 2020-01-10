import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from '../../../../../services/http/courses.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-detail-modal',
  templateUrl: './course-detail-modal.component.html',
  styleUrls: ['./course-detail-modal.component.css']
})
export class CourseDetailModalComponent implements OnInit {
  public errorMessage: string;
  public successMessage: string;
  public infoMessage: string = '';
  public messageColor: string;
  public updateForm: FormGroup;
  //Level dropdown options
  public courseCategories: Object;
  public teachersLevels: Object;
  public levels: Object;
  public courseTypes: Object;
  public durations: Object;

  @Input() command;
  @Input() whichCourse;

  constructor(
    public activeModal: NgbActiveModal,
    private coursesService: CoursesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.updateForm = this.fb.group(this.formGroupAssemble());
    // console.log(this.updateForm);    
    /* For Dropdown Options */
    this.getCourseCategories();
    this.getTeacherLevel();
    this.getLevel();
    this.getCourseType();
    this.getDuration();
    // console.log(typeof(this.getTeacherLevel()))
  }
  /*set course name automatic*/ 
  setCourseName(){
    
    const courseName
      =this.getSelectedText("courseCategory")+'-'
      +this.getSelectedText("level")+'-'
      +this.getSelectedText("teacherLevel")+'-'
      +this.getSelectedText("duration")+'-'
      +this.getSelectedText("courseType");
      this.updateForm.patchValue({CourseName:courseName});
      // =document.getElementById("courseCategory").innerText+'-'
      // +document.getElementById("level").innerText+'-'
      // +document.getElementById("teacherLevel").innerText+'-'
      // +document.getElementById("duration").innerText+'-'
      // +document.getElementById("courseType").innerText;
  }
  
  getSelectedText(elementId){
    const ele = document.getElementById(elementId) as HTMLSelectElement;
    return  ele.options[ele.selectedIndex].text;
  }
  /* For Dropdown Options*/
  getCourseCategories() {
    this.coursesService.getCourseCategories().subscribe(
      (res) => {
        this.courseCategories = res.Data;
        // console.log(this.courseCategories);
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
  getTeacherLevel() {
    this.coursesService.getTeacherLevel().subscribe(
      (res) => {
        this.teachersLevels = res.Data;
        // console.log(this.teachersLevels);
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
  getLevel() {
    this.coursesService.getLevel().subscribe(
      (res) => {
        this.levels = res.Data;
        // console.log(this.levels);
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
  getCourseType() {
    this.coursesService.getCourseType().subscribe(
      (res) => {
        this.courseTypes = res.Data;
        // console.log(this.courseTypes);
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
  getDuration() {
    this.coursesService.getDuration().subscribe(
      (res) => {
        this.durations = res.Data;
        // console.log(this.durations);
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

  formGroupAssemble() {
    let groupObj: any;
    if (this.command == 0) {
      groupObj = {
        CourseName: [null, Validators.required],
        CourseType: [null, Validators.required],
        Level: [null, Validators.required],
        TeacherLevel: [null, Validators.required],
        Duration: [null, Validators.required],
        Price: [null, Validators.required],
        CourseCategoryId: [null, Validators.required]
      }
    }
    else {
      groupObj = {
        //formControlName 决定了提交表单时的参数名
        CourseName: [this.whichCourse.CourseName, Validators.required],
        CourseType: [this.whichCourse.CourseType, Validators.required],
        Level: [this.whichCourse.Level, Validators.required],
        TeacherLevel: [this.whichCourse.TeacherLevel, Validators.required],
        Duration: [this.whichCourse.Duration, Validators.required],
        Price: [this.whichCourse.Price, Validators.compose([Validators.required, Validators.min(1)])],
        CourseCategoryId: [this.whichCourse.CourseCategory.CourseCategoryId, Validators.required],
        CourseId: [this.whichCourse.CourseId, Validators.required]
      }
    }
    return groupObj;
  }

  onSubmit(updateForm) {
    let valueToSubmit = this.updateForm.value;
    let vailadValue = this.checkInputVailad(valueToSubmit);
    // fix this
    if (vailadValue !== null && this.updateForm.dirty) {
      // console.log('Correct')
      this.stringifySubmitStr(vailadValue);
      // console.log(this.updateForm.value);
    } else if (!this.updateForm.dirty) {
      this.errorMessage = 'Data did no changing!';
      // stop here if form is invalid
    } else {
      // console.log('errors')
      this.errorMessage = 'Input incorrect.'
    }
  }

  /*
   check whether data vailad or not(ruled by Validators).
  */
  checkInputVailad(valueToSubmit) {
    //when input value pass the check of Validators, there is a [status] attr equal to 'VALID'
    if (this.updateForm.status == 'VALID') {
      return valueToSubmit;
    }
    else {
      this.infoMessage = 'Please check your input.'
      this.messageColor = '#dc3545'
      return null;
    }
  }

  /*
    after stringify submition string, data is ready to submit
  */
  stringifySubmitStr(formValue) {
    this.errorMessage = '';
    this.submitByMode(formValue);
  }

  submitByMode(formValue) {
    //while push a stream of new data
    if (this.command == 0) {
      this.coursesService.addNew(formValue).subscribe(
        (res) => {
          Swal.fire({
            title: 'Successfully Add!',
            type: 'success',
            showConfirmButton: true,
          });
          this.activeModal.close();
        },
        (err) => {
          this.backendErrorHandler(err);
          // console.log(err);
        }
      );
    }
    //while update data
    else if (this.command == 2) {
      this.coursesService.update(formValue, this.whichCourse.CourseId).subscribe(
        (res) => {
          Swal.fire({
            title: 'Successfully Modify!',
            type: 'success',
            showConfirmButton: true,
          });
          this.activeModal.close();
        },
        (err) => {
          this.backendErrorHandler(err);
          // console.log(err);
        }

      )
    }
  }

  backendErrorHandler(err) {
    console.warn(err)
    if (err.error.ErrorMessage != null) {
      this.errorMessage = err.error.ErrorMessage;
    }
    else {
      this.errorMessage = 'Error! Please check your input.'
    }
  }
}
