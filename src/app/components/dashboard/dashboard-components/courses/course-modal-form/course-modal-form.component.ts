import { Component, OnInit, Input, ViewChildren } from '@angular/core';
import { CoursesService } from '../../../../../services/http/courses.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-modal-form',
  templateUrl: './course-modal-form.component.html',
  styleUrls: ['./course-modal-form.component.css']
})
export class CourseModalFormComponent implements OnInit {
  public updateForm;

  @Input() command;
  @Input() whichCourse;

  constructor(private fb: FormBuilder, private coursesService: CoursesService) { }

  ngOnInit() {
    this.updateForm = this.fb.group(this.formGroupAssemble());
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
        CourseCategoryName: [null, Validators.required]
      }
    }
    else {
      groupObj = {
        //formControlName 决定了提交表单时的参数名
        CourseName: [{ value: this.whichCourse.CourseName }, Validators.required],
        CourseType: [{ value: this.whichCourse.CourseType }, Validators.required],
        Level: [{ value: this.whichCourse.Level }, Validators.required],
        TeacherLevel: [{ value: this.whichCourse.TeacherLevel }, Validators.required],
        Duration: [{ value: this.whichCourse.Duration }, Validators.required],
        Price: [{ value: this.whichCourse.Price }, Validators.required],
        CourseCategoryName: [{ value: this.whichCourse.CourseCategoryName }, Validators.required]
      }
    }
    return groupObj;
  }

}