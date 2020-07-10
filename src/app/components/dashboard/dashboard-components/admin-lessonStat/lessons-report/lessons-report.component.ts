import { Component, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/services/http/sessions.service';

@Component({
  selector: 'app-lessons-report',
  templateUrl: './lessons-report.component.html',
  styleUrls: ['./lessons-report.component.css']
})
export class LessonsReportComponent implements OnInit {
  ifShowReport: boolean = false
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
    // console.log('before sortting', this.sortedData)
  }

  showReport(value) {
    console.log(value)
    this.ifShowReport = true
    this.getLessons(value.orgSelect, value.termSelect);
  }

  getLessons(orgId, termId) {
    this.sessionsService.getLessonReports(orgId, termId).subscribe(
      res => {
        this.lessonsData = res['Data'];
        console.log('lessonData', this.lessonsData)
        this.sortData()
      },
      err => {
        console.log(err)
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
