import { Component, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/services/http/sessions.service';

@Component({
  selector: 'app-lessons-report',
  templateUrl: './lessons-report.component.html',
  styleUrls: ['./lessons-report.component.css']
})
export class LessonsReportComponent implements OnInit {
  lessonsData: any;
  terms: any;
  orgs: any;
  orgList: any

  constructor(public sessionsService: SessionsService) { }

  ngOnInit() {
    this.sessionsService.getLessonReports(2,4).subscribe(
      res => {
        // console.log('res', res)
        this.lessonsData = res['Data'];
        console.log('lessonData', this.lessonsData)
      },
      err => {
        console.log(err)
      })
    this.sessionsService.getTerms().subscribe(
      res => {
        this.terms = res['Data'];
        console.log('terms', this.terms)
      },
      err => {
        console.log(err)
      })

    let userOrgs = JSON.parse(localStorage.getItem('OrgId'))
    console.log(userOrgs);
    this.sessionsService.getOrgs().subscribe(
      res => {
        this.orgs = res['Data']
        console.log(this.orgs)
      },
      err => {
        console.log(err)
      })

    if (Object.keys(userOrgs).length > 1) {
      
    }
  }
}
