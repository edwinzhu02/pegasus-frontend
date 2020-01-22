import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { LearnersService } from 'src/app/services/http/learners.service';
import { Router, ActivatedRoute } from '@angular/router';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-model-template',
  templateUrl: './model-template.component.html',
  styleUrls: ['./model-template.component.css']
})
export class ModelTemplateComponent implements OnInit {
@Input() whichObject;
@Input() whichModal;
modelTitle;

// for timetable
@Input() learnerCourseTimeTable;
eventProps;

constructor(public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router:Router,
    private learnersService:LearnersService) {}
  getModalDetail(){
    switch (this.whichModal) {
      case 'pay Invoice':
        this.modelTitle = 'Invoice Payment';
        break;
      case 'Learner Credit':
        this.modelTitle = 'Learner Credit';
        break;
      case 'Learner Timetable':
        this.modelTitle = 'Learner\'s Timetable';
        break;
      case 'Lesson Rescheduling':
        this.modelTitle = 'Lesson\'s Rescheduling';
        break;
      case 'Product Payment':
        this.modelTitle = 'Product Payment';
        break;        
        default:
      this.modelTitle = '';
    }
  }
  ShowTimeTableDetail(){
    console.log(this.learnerCourseTimeTable.event.title);
    this.eventProps = this.learnerCourseTimeTable.event.extendedProps;
    this.modelTitle = 'Learner\'s Course Detail';
  }

  ngOnInit() {
    console.log(this.learnerCourseTimeTable)
    
    if (this.whichModal) {
    this.getModalDetail();
    }
    if (this.learnerCourseTimeTable){
      this.ShowTimeTableDetail();
    }
  }
  async closeSelf (){
    // sessions/calendar/admin
    // const url='sessions/calendar/admin/'+ this.eventProps.startTime;
    // this.router.navigate(['home']);
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    this.modalService.dismissAll();  
    this.router.navigate(['home']);
    await sleep(10);
    this.router.navigate(['sessions/calendar/admin/',this.eventProps.startTime]);
  }
  onClicked(isAfter){
    Swal.fire({
      title: 'Please confirm it?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.value) {
      console.log(this.learnerCourseTimeTable);
      console.log(this.learnerCourseTimeTable.event.extendedProps.lessonId);
      let { lessonId } =this.learnerCourseTimeTable.event.extendedProps;
      let userId = localStorage.getItem('staffId');
      this.learnersService.makeUpSplitLesson(lessonId,isAfter,userId).subscribe(
        (event) => {
          console.log(event);
          //@ts-ignore
          //this.eventsModel = this.putInfo(event.Data);
          Swal.fire({
            title: 'Your Operation Has Been Successfully Completed!',
            type: 'success',
            showConfirmButton: true,
          });
          this.activeModal.close('Close click')
        },
        (err) => {
          let errMsg = err.error.ErrorMessage?err.error.ErrorMessage:"Something error!"
          Swal.fire('error!', errMsg,'error')
          }
      )
    }})
  }
}
