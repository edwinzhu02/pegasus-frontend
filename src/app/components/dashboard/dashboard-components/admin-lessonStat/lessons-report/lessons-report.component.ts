import { Component, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/services/http/sessions.service';


@Component({
  selector: 'app-lessons-report',
  templateUrl: './lessons-report.component.html',
  styleUrls: ['./lessons-report.component.css']
})
export class LessonsReportComponent implements OnInit {

  lessonsData:any;
  constructor(public sessionsService:SessionsService) { }

  ngOnInit() {
    this.sessionsService.getLessonReports(2,4).subscribe(res=>{
      console.log(res)
      this.lessonsData = res['Data'];
      console.log(this.lessonsData)
    },
    err=>{
      console.log(err)
    })
  }

}
