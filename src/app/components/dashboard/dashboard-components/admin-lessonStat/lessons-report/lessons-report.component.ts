import { Component, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/services/http/sessions.service';
import * as moment from 'moment';

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
    this.getLessons();
    this.getTerms();
    this.getOrgs();
    // console.log('before sortting', this.sortedData)
  }

  showReport(data) {
    console.log(data)
    this.ifShowReport = true
    this.sortData(this.terms[data.termSelect])
  }

  getLessons() {
    this.sessionsService.getLessonReports(2,4).subscribe(
      res => {
        this.lessonsData = res['Data'];
        console.log('lessonData', this.lessonsData)
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
        this.terms.forEach(term => {
          this.sortedData[term.TermId-1] = []
          this.daysOfWeek.forEach(day => {
            this.sortedData[term.TermId-1][day] = []
          });
        })
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

  sortData(term) {
    console.log('Selected term', term)
    this.lessonsData.forEach(course => {
      if (this.match(course, term) == true) {
        let day = this.getDay(course.DayOfWeek)
        this.sortedData[term.TermId-1][day].push(course)
      }
    })
    console.log('sorted data', this.sortedData)
  }

  match(course, term) {
    let isMatch: boolean = false
    course.LessonsViewModel.forEach(element => {
      let courseDate = moment(element.OriginalDate).format( 'YYYY-MM-DD')
      let termBegin = moment(term.BeginDate).format('YYYY-MM-DD')
      let termEnd = moment(term.EndDate).format('YYYY-MM-DD')
      // console.log(courseDate)
      if (moment(courseDate).isBetween(termBegin, termEnd)) {
        isMatch = true
      }
    })
    return isMatch
  }

  getDay(day): string {
    return this.daysOfWeek[day]
  }
}
