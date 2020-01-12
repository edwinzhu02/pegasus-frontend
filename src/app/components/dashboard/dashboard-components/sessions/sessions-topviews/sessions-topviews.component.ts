import { SessionsService } from 'src/app/services/http/sessions.service';
import { SessionsCalendarViewAdminComponent } from './../sessions-views/sessions-calendar-view-admin/sessions-calendar-view-admin.component';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sessions-topviews',
  templateUrl: './sessions-topviews.component.html',
  styleUrls: ['./sessions-topviews.component.css']
})
export class SessionsTopviewsComponent implements OnInit {
 orgs:any;
//  selectedOrg:number;

private selectedOrg: any;
private dateToShow: any;

  constructor(private sessionsService: SessionsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(data => {
      this.selectedOrg = data['params'].id;
      this.dateToShow = data['params'].date;
      console.log(this.dateToShow);
    })    


    this.sessionsService.getOrgs().subscribe(
      res=>{
        this.orgs=res['Data'];
      }
    )  
  }

}
