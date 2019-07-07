import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-messager-notification',
  templateUrl: './messager-notification.component.html',
  styleUrls: ['./messager-notification.component.css']
})
export class MessagerNotificationComponent implements OnInit {
  @Input() notiNum;
  constructor() { }

  ngOnInit() {
  }

}
