import {Component, OnInit, ViewChild} from '@angular/core';
import {OptionsInput} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import {CalendarComponent} from 'ng-fullcalendar';
declare let $: any;
import timeGridPlugin from '@fullcalendar/timegrid'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sessions-calendar-view-tutor',
  templateUrl: './sessions-calendar-view-tutor.component.html',
  styleUrls: ['./sessions-calendar-view-tutor.component.css']
})
export class SessionsCalendarViewTutorComponent implements OnInit {
  options: OptionsInput;
  teacher: string;
  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;
  constructor() { }
  ngOnInit() {
    this.teacher = 'John';
    this.options = {
      editable: true,
      height: 700,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek'
      },
      eventClick: (info) => {
        Swal.fire({
          type: 'info',
          title: 'Student',
          html: '<p>John Lee</p><p>Oliver Liu</p><p>Oliver Liu</p><p>Oliver Liu</p><p>Oliver Liu</p>'
          }
        );
      },
      // eventRender: (info) => {
      //   console.log(info);
      //   if (info.event.extendedProps.group){
      //     const tooltip = new Tooltip(info.el, {
      //       title: 'Student: Mike Oliver Lee',
      //       html: true,
      //       placement: 'top',
      //       trigger: 'hover',
      //       container: 'body'
      //     });
      //   }
      // },
      events: [
        {
          title: 'Group',
          start: '2019-04-05T14:30:00',
          end: '2019-04-05T17:00:00',
          group: true
        },
        {
          title: 'One to One\nStudent: Oliver',
          start: '2019-04-05T17:30:00',
          end: '2019-04-05T19:30:00',
          group: false
        }
      ],
      plugins: [timeGridPlugin]
    };
  }

}