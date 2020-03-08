import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-boardpage',
  templateUrl: './boardpage.component.html',
  styleUrls: ['./boardpage.component.css']
})
export class BoardpageComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private router:Router) { }
  params:any;
  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      console.log(routeParams);
      this.params=routeParams;
    });

  }

}
