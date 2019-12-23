import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TimePickerService } from 'src/app/services/http/time-picker.service';
import {LearnersService} from '../../../../services/http/learners.service';
import { CoursesService } from '../../../../services/http/courses.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-timer-picker-branch',
  templateUrl: './timer-picker-branch.component.html',
  styleUrls: ['./timer-picker-branch.component.css']
})
export class TimerPickerBranchComponent implements OnInit {
  // get data form one-on-one course of learner-registration-form 
  @Input() command;
  @Input() customCourse;
  @Input() teaList;
  @Input() isAllTeacherChecked;
  // transmit begin time picked by user from time-picker to learner-registration-form
  @Output() beginTime = new EventEmitter<any>();

  // loading
  public loadingFlag: boolean = false;
  // properties for rendering in HTML
  public weekdays2 = ['1','2','3','4','5','6','7'];
  // public weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public weekdays: any[] = []; 
  public hours = [7,8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,22,23];
  public xIndex: number[] = [0, 1, 2, 3, 4, 5, 6];
  public yIndex: number[] = [];
  public startTimeToEndTime: string;

  // define every slot's property
  public slot: any[] = [];
  public slotTime: any[] = [];
  public learnerName: any[] = [];

  // assign data to local props from @Input
  public learnerOrgId: number;
  public teacherName: string;
  public duration: number;
  public teacherOrgId: number;

  // assign prop for getting data from server as parms
  public teacherId: number;
  public startDate: any;

  // prop will be output to parent component (learner-registration-form)
  public startTime: any;

  Teachers: any;

  // assign data to local props from TeacherAvailableCheck API
  public arrangedArr: any[] = [];
  public dayOffArr: any[] = [];
  public tempChangeArr: any[] = [];
  public availableDayArr: any[];
  public errorMessage: string;
  public dayofweek: any;
  private slotYCount:number=69; //from 7 AM to 24PM ,1 hour have 4 slots
  private beginSlotPos = 420; //


  public arrangedArrEx: any[] = [];
  public dayOffArrEx: any[] = [];
  public tempChangeArrEx: any[] = [];
  public availableDayArrEx: any[] = [];
  private teacherArrLength: any;

  

  constructor(private timePickerService: TimePickerService, 
              private learnerService: LearnersService,
              private coursesService:CoursesService) {
  }

  ngOnInit() {
    this.loadingFlag = true;
    // console.log('customCourse', this.customCourse, 'teacherList', this.teaList);
    // define yIndex for rendering in HTML
    for (let i = 0; i < this.slotYCount-1; i++) {
      this.yIndex.push(i);
    }

    // get data from @Input
    this.learnerOrgId = Number(this.customCourse.location);
    this.startDate = this.customCourse.beginDate;
    this.teacherId = this.teaList[0].TeacherId;
    if (this.command === 1) {
      this.teacherName = this.teaList[0].TeacherName
    } else {
      if(this.teaList[0].TeacherName!==undefined){
        this.teacherName=this.teaList[0].TeacherName
      }
      else{
        this.teacherName = this.teaList[0].Teacher.FirstName;
      }
      
    }
    this.duration = this.teaList[1].Duration;
    this.dayofweek = this.customCourse.DayOfWeek;

    // get data from server 
    // this.getTeacherAvailable();

    this.getTeachers();
  }

  getTeachers(){
    // if(this.isAllTeacherChecked){
      // this.coursesService.getOrgs().subscribe((res) => {
      //   let outData = [];
      //   // console.log(res);
      //   res['Data'].forEach(e => {
      //     outData.push({
      //       id: e['OrgId'], 
      //       title: e['OrgName']});
      //   });
  
      //   this.learnerService.GetTeacherByOrg(this.PeriodCourseChangeForm.get('OrgId').value)
      //   .subscribe(res => {
      //     this.Teachers = res['Data'];
      //     // this.teaList=this.Teachers[0].Teacher;
      //   }, err => {
      //     console.log(err);
      //   }); 

      // },
      // err => {
      //   this.isloading = false;
      //   Swal.fire({
      //     type: 'error',
      //     title: 'Oops...',
      //     text: err.error.ErrorMessage
      //   });
      // });   
    // }
    // else{


  
        this.learnerService.GetTeacherByOrg(this.learnerOrgId)
        .subscribe(res => {
          this.Teachers = res['Data'];
          console.log(this.Teachers);


          let funArr = [];

          this.Teachers.forEach(elem => {
            funArr.push(this.timePickerService.getTeacherAvailableCheck(elem.TeacherId, this.startDate));

            this.weekdays.push(elem["Teacher"].FirstName + " " + elem["Teacher"].LastName);
                // console.log('TeacherAvailableData', res.Data);
                // this.setSpecificTime(res.Data);
                // this.renderAvailableDay();
                // this.renderSlotProp();
                // this.loadingFlag = false;
                // console.log(this.xIndex,this.yIndex);
 


          });

          forkJoin(...funArr).subscribe(
            (res) => {
              console.log(res);
              // allData = res[0].Data

              this.teacherArrLength = res.length;


    // define property of slot
    for (let i = 0; i < this.teacherArrLength; i++) {
      this.slot[i] = [];
      this.learnerName[i] = [];
      this.slotTime[i] = [];
      for (let j = 0; j < this.slotYCount; j++) {
        this.slot[i][j] = null;
        this.learnerName[i][j] = null;
        this.slotTime[i][j] = `${Math.floor((this.beginSlotPos + j * 15) / 60)} : ${(this.beginSlotPos + j * 15) % 60 == 0 ? '00' : (480 + j * 15) % 60}`;
      }
    }

              for (var i = 0; i < res.length; i ++) {
              ​
                console.log(res[i].Data); // 1, "string", false
                let teaData = res[i].Data

                

                this.arrangedArrEx[i] = this.transferTime(teaData.Arranged);
                this.dayOffArrEx[i]  = this.transferTime(teaData.Dayoff);
                this.tempChangeArrEx[i]  = this.transferTime(teaData.TempChange);
                this.availableDayArrEx[i]  = teaData.AvailableDay;      
                
                
                this.renderAvailableDayEx(i);
                this.renderSlotPropEx(i);
                this.loadingFlag = false;

              ​console.log(this.slot); // 1, "string", false
              }     
              this.loadingFlag = false;
              
              console.log(this.arrangedArrEx);
              console.log(this.dayOffArrEx);
              console.log(this.tempChangeArrEx);
              console.log(this.availableDayArrEx);
            },
            (err) => {
              console.log(err);
              alert('Sorry, something went wrong.' + err)
            })          




          // let funArr = [];
          // funArr.push(this.coursesService.getCourses());
          // funArr.push(this.registrationService.getGroupCourse());
          // this.whichLearner.One2oneCourseInstance.forEach(e => {
          //   funArr.push(this.registrationService.getTeacherFilter(e.CourseId));
          // })
          // //funArr.push(this.registrationService.getTeacherFilter(this.whichLearner.One2oneCourseInstance[0].CourseId));
          // forkJoin(...funArr).subscribe(
          //   (res) => {
          //     pureCourses = res[0].Data;
          //     this.groupCourseInstance = res[1].Data;
          //     allData = res;
    
          //     console.log(pureCourses, allData)
          //     pureCourses.forEach(e => {
          //       //console.log(e);
          //       if (CatList.findIndex(c => c.CourseCategoryId === e.CourseCategory.CourseCategoryId) < 0)
          //         CatList.push(e.CourseCategory);
          //     });
          //     console.log(CatList);
    
          //     //groupCourse
          //     console.log(this.whichLearner.LearnerGroupCourse, this.groupCourseInstance);
          //     this.groupCourseInstance.forEach(g => {
          //       let foundGroupCourse = this.whichLearner.LearnerGroupCourse.find(e =>
          //         e.GroupCourseInstanceId === g.GroupCourseInstanceId
          //       );
    
          //       if (foundGroupCourse) {
          //         g.isChecked = true;
          //         g.comments = foundGroupCourse.Comment;
          //         g.beginDate = foundGroupCourse.BeginDate.slice(0, 10);
          //       } else {
          //         g.comments = null;
          //         g.isChecked = false;
          //         g.beginDate = this.myDate();
          //       }
          //     });
          //     console.log(this.whichLearner.LearnerGroupCourse, this.groupCourseInstance);
          //     this.whichLearner.LearnerGroupCourse.forEach(lg => {
    
          //     })
          //     //one to one
          //     this.whichLearner.One2oneCourseInstance.map((o, i) => {
          //       console.log(o, pureCourses);
          //       teacherFilter = allData[i + 2].Data;
          //       this.setUniCatListArray[i] = CatList;
          //       let courseItemArray1 = pureCourses.filter(e =>
          //         e.CourseCategory.CourseCategoryId == o.Course.CourseCategoryId
          //       )
          //       console.log(courseItemArray1);
          //       let courseItemArray = courseItemArray1
          //         .filter(ele =>
          //           ((o.Course.CourseCategoryId == 1 && ele.Level == this.selectLearnerLevel)
          //             || o.Course.CourseCategoryId != 1)
          //         );
          //       console.log(courseItemArray);
          //       console.log(this.courseListArray);
          //       this.courseListArray[i] = { courseItemArray: courseItemArray };
          //       console.log(this.courseListArray);
          //       //let locItemArray = TeacherFilter;
          //       this.locListArray[i] = { locItemArray: teacherFilter };
          //       //prepareTeaLevListArray[i].
          //       console.log(teacherFilter);
          //       let prepareTeaLevItemArray = teacherFilter.find(e => e.OrgId == o.OrgId).Level;
          //       this.prepareTeaLevListArray[i] = { prepareTeaLevItemArray: prepareTeaLevItemArray };
          //       //prepareTeaNameListArray[i].prepareTeaNameItemArray
          //       let prepareTeaNameItemArray = prepareTeaLevItemArray.find(e => e.levelId == o.Course.TeacherLevel).teacher;
          //       this.prepareTeaNameListArray[i] = { prepareTeaNameItemArray: prepareTeaNameItemArray };
          //       //prepareRoomListArray[i].prepareRoomItemArray
          //       let prepareRoomItemArray = teacherFilter.find(e => e.OrgId == o.OrgId).Room;
          //       this.prepareRoomListArray[i] = { prepareRoomItemArray: prepareRoomItemArray };
          //       this.customCourse.push(
          //         this.fb.group({
          //           courseCategory: [o.Course.CourseCategoryId],
          //           course: [o.Course.CourseId],
          //           teacherLevel: [o.Course.TeacherLevel],
          //           teacherName: [o.TeacherId],
          //           location: [o.OrgId],
          //           room: [o.RoomId],
          //           beginDate: [o.BeginDate ? o.BeginDate.slice(0, 10) : ''],
          //           endDate: [o.EndDate ? o.EndDate.slice(0, 10) : ''],
          //           schedule: this.fb.group({
          //             dayOfWeek: [o.CourseSchedule[0] ? (o.CourseSchedule[0].DayOfWeek ? o.CourseSchedule[0].DayOfWeek : null) : null],
          //             beginTime: [{
          //               hour: o.CourseSchedule[0] ? (o.CourseSchedule[0].BeginTime ? parseInt(o.CourseSchedule[0].BeginTime.slice(0, 2)) : null) : null,
          //               minute: o.CourseSchedule[0] ? (o.CourseSchedule[0].BeginTime ? parseInt(o.CourseSchedule[0].BeginTime.slice(3, 5)) : null) : null,
          //               second: o.CourseSchedule[0] ? (o.CourseSchedule[0].BeginTime ? parseInt(o.CourseSchedule[0].BeginTime.slice(6, 8)) : null) : null
          //             }],//{ hour: 9, minute: 0, second: 0 }
          //             //{ hour: 9, minute: 0, second: 0 }  09:03:14
          //             durationType: [o.Course.Duration]
          //           }),
          //         })
          //       );
          //       console.log(o);
          //       console.log(this.setUniCatListArray, this.courseListArray);
          //       console.log(this.locListArray, this.prepareTeaLevListArray);
          //       console.log(this.prepareTeaNameListArray, this.prepareRoomListArray);
          //     },
          //       (err) => {
          //         console.log(err);
          //         alert('Sorry, something went wrong.' + err)
          //       }
          //     );
          //   })


        }, err => {
          console.log(err);
        }); 

      

 

    // }
  }

  /* get teacher available data from TeacherAvailableCheck API in timePickerService */
  getTeacherAvailable() {
    this.timePickerService.getTeacherAvailableCheck(this.teacherId, this.startDate).subscribe(
      (res) => {
        console.log('TeacherAvailableData', res.Data);
        this.setSpecificTime(res.Data);
        this.renderAvailableDay();
        this.renderSlotProp();
        this.loadingFlag = false;
        console.log(this.xIndex,this.yIndex);
      },
      (err) => {
        this.backendErrorHandler(err);
      }
    );
  }

  backendErrorHandler(err) {
    console.warn(err);
    if (err.error.ErrorMessage != null) {
      this.errorMessage = err.error.ErrorMessage;
    } else {
      this.errorMessage = "Error! Can't catch Data."
    }
  }


  ///////////////////////////////////// get and reconstruct data from server//////////////////////////////////
  /*
    convert begin time and end time to the number of y
    and then reconstruct a new arr from TeacherAvailableCheck API 
  */
  transferTime(originalArr: any[]) {
    let arr = [];
    for (let data of originalArr) {
      // convert begin time to the number of y
      let TimeBeginToArr = data.TimeBegin.slice(11, 19).split(':');
      let TimeBeginToMinutes = (+TimeBeginToArr[0]) * 60 + (+TimeBeginToArr[1]);
      let beginMinutesToY = (+TimeBeginToMinutes - this.beginSlotPos) / 15;
      // convert end time to the number of y
      let TimeEndToArr = data.TimeEnd.slice(11, 19).split(':');
      let TimeEndToMinutes = (+TimeEndToArr[0]) * 60 + (+TimeEndToArr[1]);
      let endMinutesToY = (TimeEndToMinutes - this.beginSlotPos) / 15;
      // reconstruct a new arr
      let obj = {};
      obj['DayOfWeek'] = data.DayOfWeek;
      obj['BeginY'] = beginMinutesToY;
      obj['EndY'] = endMinutesToY;
      obj['LearnerName'] = data.LearnerName;
      obj['OrgId'] = data.OrgId;
      arr.push(obj);
    };
    return arr;
  }
  /*
    callback transferTime function
    convert original data of array to new array for handy to manipulate
    and get teacher available day from server
  */
  setSpecificTime(teacherData: any) {
    this.arrangedArr = this.transferTime(teacherData.Arranged);
    this.dayOffArr = this.transferTime(teacherData.Dayoff);
    this.tempChangeArr = this.transferTime(teacherData.TempChange);
    this.availableDayArr = teacherData.AvailableDay;
  }


  /////////////////////////////////// render server data in HTML/////////////////////////////////////////////////////////
  /* 
    define teacher's Available day for rendering in HTML 
  */
  renderAvailableDay() {
    this.availableDayArr.map((o) => {
      let xIndex = o['DayOfWeek'] - 1;
      for (let i = 0; i < this.slotYCount; i++) {
        this.slot[xIndex][i] = 'isAvailable';
      };
    });
  }

  renderAvailableDayEx(index) {
    this.availableDayArrEx[index].map((o) => {
      // let xIndex = o['DayOfWeek'] - 1;
      for (let i = 0; i < this.slotYCount; i++) {
        this.slot[index][i] = 'isAvailable';
      };
    });
  }  

  /* 
    define teacher's other data (Arranged,Dayoff,TempChange) from server for rendering in HTML 
  */
  defineSlotProp(originalArr: any[], prop: string) {
    for (let o of originalArr) {
      let xIndex = o['DayOfWeek'] - 1;
      this.learnerName[xIndex][o['BeginY']] = o['LearnerName'];
      for (let i = o['BeginY']; i < o['EndY']; i++) {
        this.slot[xIndex][i] = prop;
      }
    };
    return this.slot;
  }

  defineSlotPropEx(originalArr: any[], prop: string, index) {
    for (let o of originalArr) {
      let xIndex = index;
      this.learnerName[xIndex][o['BeginY']] = o['LearnerName'];
      for (let i = o['BeginY']; i < o['EndY']; i++) {
        this.slot[xIndex][i] = prop;
      }
    };
    return this.slot;
  }
  
  /* 
    callback defineSlotProp function for ngClass in HTML 
  */
  renderSlotProp() {
    this.defineSlotProp(this.arrangedArr, 'isArranged');
    this.defineSlotProp(this.dayOffArr, 'isDayOff');
    this.defineSlotProp(this.tempChangeArr, 'isTempChange');
  }

  renderSlotPropEx(index) {
    this.defineSlotPropEx(this.arrangedArrEx[index], 'isArranged', index);
    this.defineSlotPropEx(this.dayOffArrEx[index], 'isDayOff', index);
    this.defineSlotPropEx(this.tempChangeArrEx[index], 'isTempChange', index);
  }  

  ///////////////////////////////// event triggered in HTML /////////////////////////////////////////////////////////////
  mouseover(x: number, y: number) {
    this.availableDayArr.map((availableObj) => {
      if (this.dayofweek !== undefined) {
        let availableX = this.dayofweek - 1;
        if (x == availableX) {
          this.checkTeacherOrg(x, y, availableObj, availableX);
        }
      }
      else {
        let availableX = availableObj['DayOfWeek'] - 1;
        if (x == availableX) {
          this.checkTeacherOrg(x, y, availableObj, availableX);
        }
      }
    })
    // this.tempChangeIsAbleToPick(x, y);
  }

  mouseoverEx(x: number, y: number) {
    this.availableDayArrEx[x].map((availableObj) => {
      if (this.dayofweek !== undefined) {
        let availableX = this.dayofweek - 1;
        if ((availableObj['DayOfWeek']-1) == availableX) {
          this.checkTeacherOrgEx(x, y, availableObj, availableX);
        }
      }
      else {
        // let availableX = availableObj['DayOfWeek'] - 1;
        // if (x == availableX) {
        //   this.checkTeacherOrgEx(x, y, availableObj, availableX);
        // }
      }
    })
    // this.tempChangeIsAbleToPick(x, y);
  }

  mouseout(x: number, y: number) {
    this.availableDayArr.map((o) => {
      let xIndex = o['DayOfWeek'] - 1;
      for (let i = 0; i < this.slotYCount; i++) {
        if (this.slot[xIndex][i] == "ableToPick") {
          this.slot[xIndex][i] = "isAvailable";
        }
      }
    });
    this.tempChangeArr.map((o) => {
      let xIndex = o['DayOfWeek'] - 1;
      for (let i = 0; i < this.slotYCount; i++) {
        if (this.slot[xIndex][i] == "ableToPick") {
          this.slot[xIndex][i] = "isTempChange"
        }
      }
    })
  }

  mouseoutEx(x: number, y: number) {
    this.availableDayArrEx[x].map((o) => {
      let xIndex = o['DayOfWeek'] - 1;
      if(xIndex == (this.dayofweek - 1)){
        for (let i = 0; i < this.slotYCount; i++) {
          if (this.slot[x][i] == "ableToPick") {
            this.slot[x][i] = "isAvailable";
          }
        }
      }
    });
    this.tempChangeArrEx[x].map((o) => {
      let xIndex = o['DayOfWeek'] - 1;
      if(xIndex == (this.dayofweek - 1)){
        for (let i = 0; i < this.slotYCount; i++) {
          if (this.slot[x][i] == "ableToPick") {
            this.slot[x][i] = "isTempChange"
          }
        }
      }
    })
  }
  
  confirm(x: number, y: number) {
    let outputObj = {};
    outputObj['BeginTime'] = this.startTime;
    outputObj['Index'] = this.teaList[2];
    outputObj['DayOfWeek'] = this.weekdays[x];
    this.beginTime.emit(outputObj);
  }
  ////////////////////////////// check if teacher's org includes learner's org/////////////////////////////////
  checkTeacherOrg(x: number, y: number, availableObj, availableX) {
    let availableOrgId = availableObj.Orgs.map((o) => o.OrgId);
    /* 判断 availableDay org 是否包含 learner org */
    // availableDay org includes learner org
    if (availableOrgId.includes(this.learnerOrgId)) {
      /* 判断 available org 是否有 arranged */
      this.checkAvailableHasArrangedEx(x, y, availableObj, availableX);
    }
  }

  checkTeacherOrgEx(x: number, y: number, availableObj, availableX) {
    let availableOrgId = availableObj.Orgs.map((o) => o.OrgId);
    /* 判断 availableDay org 是否包含 learner org */
    // availableDay org includes learner org
    if (availableOrgId.includes(this.learnerOrgId)) {
      /* 判断 available org 是否有 arranged */
      this.checkAvailableHasArrangedEx(x, y, availableObj, availableX);
    }
  }  
  
  checkAvailableHasArranged(x: number, y: number, availableObj, availableX) {
    if (this.arrangedArr.length != 0) {
      this.arrangedArr.map((arrangedObj) => {
        let arrangedX = arrangedObj['DayOfWeek'] - 1;
        // if availableDay has arranged
        if (arrangedX == availableX) {
          /* 判断 arranged org 是否等于 learner org */
          this.checkArrangedOrg(x, y, arrangedObj);
        }
        else {
          this.setDuration('isAvailable', 'ableToPick', x, y)
        }
      })
    }
    else {
      this.setDuration('isAvailable', 'ableToPick', x, y);
    }
  }

  checkAvailableHasArrangedEx(x: number, y: number, availableObj, availableX) {
    if (this.arrangedArrEx[x].length != 0) {
      this.arrangedArrEx[x].map((arrangedObj) => {
        let arrangedX = arrangedObj['DayOfWeek'] - 1;
        // if availableDay has arranged
        if (arrangedX == availableX) {
          /* 判断 arranged org 是否等于 learner org */
          this.checkArrangedOrgEx(x, y, arrangedObj);
        }
        else {
          this.setDuration('isAvailable', 'ableToPick', x, y)
        }
      })
    }
    else {
      this.setDuration('isAvailable', 'ableToPick', x, y);
    }
  }
  
  checkArrangedOrg(x: number, y: number, arrangedObj) {
    let arrangedOrgId = arrangedObj['OrgId'];
    if (arrangedOrgId==undefined) return;
    if ((arrangedOrgId == this.learnerOrgId)) {
      // arranged 前后可选
      this.setDuration('isAvailable', 'ableToPick', x, y)
    } else {
      // arranged 前后一小时不能选
      console.log(arrangedOrgId,this.learnerOrgId);
      this.aroundArrangedCanNotPick();
      this.setDuration('isAvailable', 'ableToPick', x, y)
    }
  }

  checkArrangedOrgEx(x: number, y: number, arrangedObj) {
    let arrangedOrgId = arrangedObj['OrgId'];
    if (arrangedOrgId==undefined) return;
    if ((arrangedOrgId == this.learnerOrgId)) {
      // arranged 前后可选
      this.setDuration('isAvailable', 'ableToPick', x, y)
    } else {
      // arranged 前后一小时不能选
      console.log(arrangedOrgId,this.learnerOrgId);
      this.aroundArrangedCanNotPickEx(x);
      this.setDuration('isAvailable', 'ableToPick', x, y)
    }
  }

  
  aroundArrangedCanNotPick() {
    this.arrangedArr.map((o) => {
      let xIndex = o['DayOfWeek'] - 1;
      for (let i = o['BeginY'] - 4; i < o['EndY'] + 5; i++) {
        if (this.slot[xIndex][i] != "isArranged") {
          this.slot[xIndex][i] = "oneHourUnableTopick";
        }
      }
    })
  }

  aroundArrangedCanNotPickEx(x: number) {
    this.arrangedArrEx[x].map((o) => {
      let xIndex = o['DayOfWeek'] - 1;
      for (let i = o['BeginY'] - 4; i < o['EndY'] + 5; i++) {
        if (this.slot[xIndex][i] != "isArranged") {
          this.slot[xIndex][i] = "oneHourUnableTopick";
        }
      }
    })
  }  

  //////////////////////////////////// deal with tempChangeArr //////////////////////////////////////////////////
  /* 
    check if temp change >= duration
  */
  checkTempChange(x: number, y: number) {
    this.tempChangeArr.map((o) => {
      let gap = o.EndY - o.BeginY;
      if (gap + 1 < this.duration) {
        return false
      }
    });
    return true;
  }
  /* 
  if temp change >= duration, 
  then tempChangeArr is able to pick 
  */
  tempChangeIsAbleToPick(x: number, y: number) {
    this.tempChangeArr.map((o) => {
      let xIndex = o.DayOfWeek - 1
      if (this.checkTempChange(x, y) && x == xIndex && this.slot[x][y] == "isTempChange") {
        this.setDuration('isTempChange', 'ableToPick', x, y);
      }
    })
  }

  /////////////////////// check if has next duration and former duration  /////////////////////////////////////
  hasNextDuration(isAvailable: string, x: number, y: number) {
    for (let i = 0; i < this.duration + 1; i++) {
      if (this.slot[x][y + i] != isAvailable) {
        return false;
      }
    };
    return true;
  }
  getBottomY(isAvailable: string, ableToPick: string, x: number, y: number) {
    for (let i = 0; i < this.duration + 1; i++) {
      if (y != 0 && this.slot[x][y + i] != isAvailable && this.slot[x][y + i] != ableToPick) {
        return y + i - 1;
      }
    }
  }
  hasFormerDuration(isAvailable: string, ableToPick: string, x: number, y: number) {
    let bottomY = this.getBottomY(isAvailable, ableToPick, x, y);
    for (let i = 0; i < this.duration + 1; i++) {
      if (this.slot[x][bottomY - i] != isAvailable) {
        return false;
      }
    };
    return true;
  }
  setDuration(isAvailable: string, ableToPick: string, x: number, y: number) {
    if (this.hasNextDuration(isAvailable, x, y)) {
      for (let i = 0; i < this.duration + 1; i++) {
        this.slot[x][y + i] = ableToPick;
        this.startTime = `${this.slotTime[x][y]}`;
        this.startTimeToEndTime = `${this.slotTime[x][y]}-${this.slotTime[x][y + this.duration + 1]}`;
      };
    } else if (this.hasFormerDuration(isAvailable, ableToPick, x, y)) {
      let bottomY = this.getBottomY(isAvailable, ableToPick, x, y);
      for (let i = 0; i < this.duration + 1; i++) {
        this.slot[x][bottomY - i] = ableToPick;
      };
    }
  }
 
}
//test

