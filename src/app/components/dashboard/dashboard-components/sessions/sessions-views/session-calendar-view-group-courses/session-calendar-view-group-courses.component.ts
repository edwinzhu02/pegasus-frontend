import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import {OptionsInput} from '@fullcalendar/core';
import timeslot from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {CalendarComponent} from 'ng-fullcalendar';

import { CoursesService } from '../../../../../../services/http/courses.service';
import { SessionsService } from '../../../../../../services/http/sessions.service';

import Swal from 'node_modules/sweetalert2/dist/sweetalert2.all.min.js';

import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { FormBuilder, FormGroup} from '@angular/forms';
import { DatePipe } from '@angular/common';

// import { SessionsCalendarViewAdminComponent } from '../sessions-calendar-view-admin/sessions-calendar-view-admin.component';

@Component({
  selector: 'app-session-calendar-view-group-courses',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './session-calendar-view-group-courses.component.html',
  styleUrls: ['./session-calendar-view-group-courses.component.css']
})
export class SessionCalendarViewGroupCoursesComponent implements OnInit {

  @ViewChild(CalendarComponent) fullcalendar: CalendarComponent;
  @ViewChild('datepicker') datePicker;

  private calendarOptions: OptionsInput;
  private calendarResourceData: any;
  private calendarEventData = [];

  private searchForm: FormGroup; // searchform by formbuilder

  private clickedBranch: any;

  private isOneToOne: any;

  private isloading = false;

  constructor(private coursesService:CoursesService,
    private sessionService:SessionsService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit() {

    this.activatedRouter.paramMap.subscribe(data => {
      this.isOneToOne = data['params'].onetoone;
      console.log(this.isOneToOne);
    })      

    this.searchForm = this.fb.group({
      dateOfLesson: ['']
    })

    this.isloading = true;
    // this.getGroupCourse();    

    this.coursesService.getOrgs().subscribe((res) => {
      let outData = [];
      // console.log(res);
      res['Data'].forEach(e => {
        outData.push({
          id: e['OrgId'], 
          title: e['OrgName']});
      });

      this.calendarResourceData = outData;


      if(this.isOneToOne == null || this.isOneToOne == undefined){    //group courses

        this.coursesService.getCourseClasses().subscribe(data => {

          console.log(data);
    
          let courses = data['Data'];
          let outData = courses;
          outData.forEach(element => {
            element['start'] = element['BeginDate'];
            element['end'] = element['EndDate'];
            element['resourceId'] = element['Org']['OrgId'];
            element['title'] = "GroupCourseInstanceId: " + element['GroupCourseInstanceId'] + ", " + element['Course']['CourseName']  + ", " + element['BeginDate']  + " -> " + element['EndDate'];
            // element['color'] = "red";
            element['borderColor'] = "red";

            element['OrgId'] = element['Org']['OrgId'];
          });
    
          this.calendarEventData = outData;
    
          console.log(outData);
          this.isloading = false;
  
          this.setUpFullCalendar();
   
        }, err => {
          // this.isloadingSmall = false;
          this.isloading = false;
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.error.ErrorMessage
          });
        });

      }
      else{   //one to one courses

        let Dates = new Date();

        const year: number = Dates.getFullYear();
        const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();

        let date = year + '-' + month + '-' + day
        let datetoshow = this.datePipe.transform(date, 'yyyy-MM-dd');

        this.sessionService.getLessonsForSchool(datetoshow).subscribe(data => {
          console.log(data);

          let courses = data['Data'];
          let outData = courses;
          outData.forEach(element => {
            element['start'] = element['BeginTime'];
            element['end'] = element['EndTime'];
            element['resourceId'] = element['org']['OrgId'];
            element['title'] = element['org']['OrgName']  + ", " + element['BeginTime']  + " -> " + element['EndTime'];
            element['color'] = "blue";
            // element['borderColor'] = "red";

            element['OrgId'] = element['org']['OrgId'];
          });


          this.calendarEventData = outData;
  
          console.log(outData);
          this.isloading = false;
  
          this.setUpFullCalendar();

        }, err => {
          // this.isloadingSmall = false;
          this.isloading = false;
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.error.ErrorMessage
          });
        });

      }
    },
    err => {
      this.isloading = false;
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: err.error.ErrorMessage
      });
    });
 
  }

  setUpFullCalendar(){
    this.calendarOptions = {
      themeSystem: 'jquery-ui',
      editable: true,
      eventDurationEditable: false,
      displayEventTime: true,
      firstDay: 1,
      selectable: true,
      select(info) {
        // that.selectSlot(info);
      },
      customButtons: {
        DayPickerButton: {
          text: 'Search',
          click: () => {
            this.modalService.open(this.datePicker);
          }
        }
      },
      ////////
      eventClick: (info) => {
        const dateCu = this.datePipe.transform(this.fullcalendar.calendar.getDate(), 'yyyy-MM-dd');
        this.clickedBranch = info.event.extendedProps.OrgId;
        console.log(this.clickedBranch);
        this.router.navigate(['../topview', {id: this.clickedBranch, date: dateCu}],{relativeTo: this.activatedRouter});
      },
      ////////
      eventDrop: (info) => { // when event drag , need to send put request to change the time of this event

      },
      resources: this.calendarResourceData,
      events: this.calendarEventData,
      allDaySlot: false,
      defaultView: 'resourceTimeGridDay',
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      minTime: '07:00',
      maxTime: '24:00',
      scrollTime: '16:00',
      height: window.innerHeight - 110,
      titleFormat:{ year: 'numeric', month: 'short', day: 'numeric', weekday:'short'} ,
      views: {
        resourceTimeGridDay: {
          buttonText: 'Day',
          slotDuration: '00:15'
        }
      },
      windowResize: () => {
        this.fullcalendar.calendar.setOption('height', window.innerHeight - 110);
        // this.fullcalendar.calendar.setOption('width', window.innerWidth - 110);
      },
      header: {
        left: 'today prev,next DayPickerButton title ',
        center: '',
        right: ''
      },
      plugins: [timeslot, interactionPlugin]
    }; 
  }


  calendarClickButton = (model) => {
    if (model.buttonType === 'next' || model.buttonType === 'today' || model.buttonType === 'prev' || model.buttonType === 'testButton') {
      // const datefromcalendar = model.data;
      // const date = this.datePipe.transform(datefromcalendar, 'yyyy-MM-dd');
      // this.debounce(() => {
      //   this.getEventByDate(date);
      // }, 500);
    }

  }

  search = () => {
    if (this.searchForm.get('dateOfLesson').value === '' || this.searchForm.get('dateOfLesson').value === null) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'please enter the date before submitting'
      });
      return;
    }
    const year = this.searchForm.get('dateOfLesson').value.year;
    const month = this.searchForm.get('dateOfLesson').value.month;
    const day = this.searchForm.get('dateOfLesson').value.day;
    const date = year + '-' + month + '-' + day
    const datetoshow = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.fullcalendar.calendar.gotoDate(datetoshow);
  }

  // getGroupCourse(){
  //   this.coursesService.getCourseClasses().subscribe(data => {

  //     console.log(data);

  //     let courses = data['Data'];
  //     let outData = courses;
  //     outData.forEach(element => {
  //       element['start'] = element['BeginDate'];
  //       element['end'] = element['EndDate'];
  //       element['resourceId'] = element['Org']['OrgId'];
  //       element['title'] = "GroupCourseInstanceId: " + element['GroupCourseInstanceId'] + ", " + element['Course']['CourseName']  + ", " + element['BeginDate']  + " -> " + element['EndDate'];
  //       // element['color'] = "red";
  //       element['borderColor'] = "red";
  //     });

  //     this.calendarEventData = outData;

  //     console.log(outData);
  // }, err => {
  //   // this.isloadingSmall = false;
  //   Swal.fire({
  //     type: 'error',
  //     title: 'Oops...',
  //     text: err.error.ErrorMessage
  //   });
  // });
  // }

  // getOrgs()
  // {
  //   this.coursesService.getOrgs().subscribe((res) => {

  //     var dataObj: [];
  //     let outData = [];
  //     console.log(res);

  //     dataObj = res['Data'];

  //     dataObj.forEach(e => {
  //       outData.push({
  //         id: e['OrgId'], 
  //         title: e['OrgName']});
  //     });

  //     // for(let i=0; i<dataObj.length; i++){
  //     //   this.calendarResourceData.push({id: dataObj[i].OrgId, title: dataObj[i].OrgName});
  //     // }
  //     return outData;
  //   },
  //   err => {
  //     Swal.fire({
  //       type: 'error',
  //       title: 'Oops...',
  //       text: err.error.ErrorMessage
  //     });
  //   });
  // }
}
