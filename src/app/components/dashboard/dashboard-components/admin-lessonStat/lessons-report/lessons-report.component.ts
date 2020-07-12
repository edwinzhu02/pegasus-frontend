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
    this.weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11','Week 12', 'Week 13', 'Week 14']
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
          this.sortData()
        } else {
          this.showSpinner = false
          this.dataReady = false
        }
        this.showSpinner = false
        // console.log(this.dataReady)
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
        console.log('terms', this.terms)
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
        // console.log(this.orgs)
      },
      err => {
        console.log(err)
        alert('Error! Something went wrong. Plaese refer console for further information.')
      })
  }

  sortData() {
    // console.log('Selected term', term)
    this.daysOfWeek.forEach(day => {
      this.sortedData[day] = []
    });
    this.lessonsData.forEach(course => {
      let day = this.getDay(course.DayOfWeek)
      this.sortedData[day].push(course)
    })
    console.log('sorted data', this.sortedData)
  }

  getDay(day): string {
    return this.daysOfWeek[day]
  }
}
