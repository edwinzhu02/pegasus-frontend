import { Component, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/services/http/sessions.service';

@Component({
  selector: 'app-lessons-report',
  templateUrl: './lessons-report.component.html',
  styleUrls: ['./lessons-report.component.css']
})
export class LessonsReportComponent implements OnInit {
  userOrgId = []
  ifShowReport: boolean = false
  showSpinner: boolean = false
  dataReady: boolean
  lessonsData: any;
  terms: any;
  orgs: any;
  orgList: any
  daysOfWeek = [];
  weeks = [];
  sortedData = [];

  constructor(public sessionsService: SessionsService) { }

  ngOnInit() {
    this.daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.weeks = ['W 1', 'W 2', 'W 3', 'W 4', 'W 5', 'W 6', 'W 7', 'W 8', 'W 9', 'W 10', 'W 11','W 12', 'W 13', 'W 14']
    this.getTerms();
    this.getOrgs();
    this.userOrgId = JSON.parse(localStorage.getItem('OrgId'))
  }

  showReport(value) {
    console.log(value)
    this.ifShowReport = true
    this.showSpinner = true
    if (this.userOrgId.length > 1) {
      this.getLessons(value.orgSelect, value.termSelect);
    } else {
      this.getLessons(this.userOrgId[0], value.termSelect)
    }
  }

  getLessons(orgId, termId) {
    this.sessionsService.getLessonReports(orgId, termId).subscribe(
      res => {
        this.lessonsData = res['Data'];
        console.log('lessonData', this.lessonsData)
        if (this.lessonsData[0]) {
          this.showSpinner = false
          this.dataReady = true
          this.parseData()
        } else {
          this.showSpinner = false
          this.dataReady = false
        }
        this.showSpinner = false
      },
      err => {
        console.log(err)
        alert('Error! Something went wrong. Plaese refer console for further information.')
      })
  }
  
  getTerms() {
    this.sessionsService.getTerms().subscribe(
      res => {
        this.terms = res['Data'];
      },
      err => {
        console.log(err)
        alert('Error! Something went wrong. Plaese refer console for further information.')
      })
  }

  getOrgs() {
    this.sessionsService.getOrgs().subscribe(
      res => {
        this.orgs = res['Data']
      },
      err => {
        console.log(err)
        alert('Error! Something went wrong. Plaese refer console for further information.')
      })
  }

  parseData() {
    this.daysOfWeek.forEach(day => {
      this.sortedData[day] = []
    });
    this.lessonsData.forEach(course => {
      let day = this.getDay(course.DayOfWeek)
      this.sortedData[day].push(course)
      this.sortData(day)
    })
    console.log('sorted data', this.sortedData)
    // console.log(this.sortData('Sunday'))
  }

  sortData(day) {
    function compare(a, b) {
      const A = a.Teacher.toUpperCase()
      const B = b.Teacher.toUpperCase()
      const C = a.FirstName.toUpperCase()
      const D = b.FirstName.toUpperCase()
      let comparison = 0
      if (A > B) {
        comparison = 1
      } else if (A < B) {
        comparison = -1
      } else if (C > D) {
        comparison = 1
      } else if (C < D) {
        comparison = -1
      }
      return comparison
    }
    this.sortedData[day].sort(compare)
  }

  isHide(day, week) {
    if (this.weeks.indexOf(week) > this.findMaxWeekNo(day)) {
      return true
    } else {
      return false
    }
  }

  findMaxWeekNo(day) {
    let array = []
    this.sortedData[day].forEach(element => {
      element.LessonsViewModel.forEach(lesson => {
        array.push(lesson.WeekNo)
      })
    })
    return Math.max(...array)
  }

  getDay(day): string {
    return this.daysOfWeek[day]
  }
}
