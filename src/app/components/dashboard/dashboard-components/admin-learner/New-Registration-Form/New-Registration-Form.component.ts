import { Component, OnInit, Input } from '@angular/core';
import { Command } from 'protractor';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CoursesService } from 'src/app/services/http/courses.service';
import { LearnerRegistrationService } from 'src/app/services/http/learner-registration.service';


@Component({
  selector: 'app-New-Registration-Form',
  templateUrl: './New-Registration-Form.component.html',
  styleUrls: ['./New-Registration-Form.component.css']
})
export class NewRegistrationFormComponent implements OnInit {
  public registrationForm: FormGroup
  public locations: Array<any>
  public learnerLevel: Array<any>;
  public levelType: Array<any>;
  public learnerlevelType = 1;
  public isSelectedLevel =false;
  public selectedPhoto: File = null;
  public selectedGrade: File = null;
  public selectedAgreement: File = null;
  public selectedOther: File = null;
  public maxSize: number = 1024;
  photoObj;


  @Input() command
  @Input() whichLearner
  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private registrationService: LearnerRegistrationService,
  ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group(this.formBuild());
    this.getLocationFromServer()
    this.getLookUp()
   this.editFormSelectLevel()
  }

  formBuild() {
    let groupObj: any;
    if (this.command == 1) {
      groupObj = {
        FirstName: [null, Validators.required],
        MiddleName: [null],
        LastName: [null, Validators.required],
        Gender: ['', Validators.required],
        dob: [null],
        EnrollDate: [null],
        ContactNum: [null],
        Email: [null, [Validators.required, Validators.email]],
        Address: [null],
        OrgId: [null, Validators.required],
        LearnerLevel: [null, Validators.required],
        LevelType: [null],
        levelTypeRadio: [null],
        IsUnder18: [null],
        PaymentPeriod: [null],
        Referrer: [null],
        Comment: [null],

        // photo
        photo: [null],
        grade: [null],
        Agreement: [null],
        OtherFile: [null],
      }
    }
    else {

      groupObj = {
        FirstName: [this.whichLearner.FirstName, Validators.required],
        MiddleName: [this.whichLearner.MiddleName ? this.whichLearner.MiddleName : ' '],
        LastName: [this.whichLearner.LastName, Validators.required],
        Gender: [this.whichLearner.Gender, Validators.required],
        dob: [this.getDateFormat(this.whichLearner.Dob)],
        EnrollDate: [this.getDateFormat(this.whichLearner.EnrollDate)],
        ContactNum: [this.whichLearner.ContactNum],
        Email: [this.whichLearner.Email, [Validators.required, Validators.email]],
        Address: [this.whichLearner.Address],
        OrgId: [this.whichLearner.OrgId, Validators.required],
        LearnerLevel: [this.whichLearner.LearnerLevel, Validators.required],
        // LevelType: [this.whichLearner.LevelType],
        levelTypeRadio: [this.whichLearner.LevelType],
        IsUnder18: [this.whichLearner.IsUnder18],
        PaymentPeriod: [this.whichLearner.PaymentPeriod],
        Referrer: [this.whichLearner.Referrer],
        Comment: [this.whichLearner.Comment],

        // photo
        photo: [null],
        grade: [null],
        Agreement: [null],
        OtherFile: [null],
      }
    }
    return groupObj
  }

  getDateFormat(date) {
    if (date !== null) {
      return (date.substring(0, 10))
    }
    return null;
  }

  handleIsUnder18(DOB) {
    console.log(DOB);
    let nowYear = new Date().getFullYear();
    let birthYear = Number(DOB.substring(0, 4));
    let isUnder18 = nowYear - birthYear <= 18 ? 0 : 1;

    this.registrationForm.get("IsUnder18").patchValue(isUnder18);
    console.log(isUnder18)
  }
  getLocationFromServer() {
    this.coursesService.getOrgs().subscribe(
      (res) => {
        this.locations = res['Data'];
        console.log(this.locations)
      }
    )
  }

  selectLevelType(value) {
    this.learnerlevelType = Number(value);
  }

  getLookUp() {
    this.registrationService.getLookups(4)
      .subscribe(
        data => {
          console.log('learner level', data);
          this.learnerLevel = data.Data;
        },
        err => {
          console.log('learner level err', err);
        }
      );

    this.registrationService.getLookups(5)
      .subscribe(
        data => {
          console.log('level type', data);
          this.levelType = data.Data;
          console.log('level type', this.levelType)
        },
        err => {
          console.log('level type err', err);
        }
      );
  }

  isSelectLevel(){
    this.isSelectedLevel=true
  }

  editFormSelectLevel(){
    if(this.command == 2){
      this.isSelectedLevel=true
    }
  }

  uploadPhoto(event: any) {
    this.selectedPhoto = <File>event.target.files[0];
    let photoRender = this.selectedPhoto;
    this.photoObj = document.querySelector('#photoID');
    let that = this;
    let fileSize = (Number(<File>event.target.files[0].size)) / 1024;
    if(this.checkPhotoSize(fileSize)){
        let reader = new FileReader();
    reader.onloadend = function () {
      that.photoObj.setAttribute("src", this.result.toString());
    }
    reader.readAsDataURL(photoRender);
    }
  }

  uploadGrade(event: any) {
    this.selectedGrade = <File>event.target.files[0];
    let photoRender = this.selectedGrade;
    this.photoObj = document.querySelector('#certificate');
    let that = this;
    let reader = new FileReader();
    reader.onloadend = function () {
      console.log(this.result)
      that.photoObj.setAttribute("src", this.result.toString());
    }
    reader.readAsDataURL(photoRender);
  }

  uploadAgreement(event) {
    this.selectedAgreement = <File>event.target.files[0];
  }

  uploadOther(event) {
    this.selectedOther = <File>event.target.files[0];
  }

    /*
    check photo size, photo size can not lager than limit
  */
 checkPhotoSize(size) {
  if (size > this.maxSize) {
    alert("Photo size can not large than 1M");
    return false;
  }
  else {
    return true;
  }
}
}
