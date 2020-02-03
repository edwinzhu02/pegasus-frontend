import { Component, OnInit, Input, ViewChild, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TimePickerComponent } from '../../time-picker/time-picker.component';
import { TimerPickerBranchComponent } from '../../timer-picker-branch/timer-picker-branch.component';

import { Observable } from 'rxjs';
import { Command } from 'protractor';
@Component({
  selector: 'app-learner-registration-modal',
  templateUrl: './learner-registration-modal.component.html',
  styleUrls: ['./learner-registration-modal.component.css']
})
export class LearnerRegistrationModalComponent implements OnInit, AfterViewChecked {
  timepickerChosen;
  // get data from timepickerComponent
  @ViewChild(TimePickerComponent) timePickerComponent;
  @ViewChild(TimerPickerBranchComponent) timerPickerBranchComponent; 

  @Input() customCourse;
  @Input() teaList;
  @Input() isSpecifiedTime;
  @Input() dayOfWeekChoose;

  // edwin add
  @Input() command;
  @Input() whichLearner;
  public beginTime: any = null;
  public modalopen: boolean = true;
  // timepicker send back to main component
  @Output() beginTimeTo: EventEmitter<any> = new EventEmitter

  constructor(public activeModal: NgbActiveModal) { }

  ngAfterViewChecked() {
    if(this.isSpecifiedTime){
      this.timepickerChosen = this.timerPickerBranchComponent.name; 
    }
    else{
      this.timepickerChosen = this.timePickerComponent.name;      
    }
  }

  ngOnInit() {
  }

  beginTimeFromChild(event) {

    this.beginTimeTo.emit(event)
    this.activeModal.dismiss();
  }

}
