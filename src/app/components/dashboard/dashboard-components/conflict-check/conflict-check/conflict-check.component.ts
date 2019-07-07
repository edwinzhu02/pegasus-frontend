import { Component, OnInit } from '@angular/core';
import { ConflictCheckService } from 'src/app/services/http/conflict-check.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionDetailEditModalComponent } from '../../sessions/session-modals/session-detail-edit-modal/session-detail-edit-modal.component';

@Component({
  selector: 'app-conflict-check',
  templateUrl: './conflict-check.component.html',
  styleUrls: ['./conflict-check.component.css']
})
export class ConflictCheckComponent implements OnInit {
  public loadingFlag: boolean = false;
  roomConflictShow=false;
  teacherConflictShow=false;
  roomConflictData:any
  teacherConflictData:any
  constructor(
    private conflictCheckService:ConflictCheckService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.roomConflictShow=true;
    this.getConflictData()
  }

  roomConflict(){
    this.roomConflictShow=true;
    this.teacherConflictShow=false;
  }

  teacherConflict(){
    this.roomConflictShow=false;
    this.teacherConflictShow=true;
  }

  getConflictData(){
    this.conflictCheckService.getConflictInfo().subscribe(
      (res) => {
        this.roomConflictData=res.Data.RoomConflict;
        console.log(this.roomConflictData)
        this.teacherConflictData=res.Data.TeacherConflict;
        console.log(this.teacherConflictData)
      }
    )
  }

  openSessionEdit(j){
    const modalRef= this.modalService.open(SessionDetailEditModalComponent,  { size: 'lg', backdrop: 'static', keyboard: false })
    modalRef.componentInstance.LessonModel=j
    modalRef.componentInstance.LessonModel.courseId=j.CourseId
    let that =this
    modalRef.result.then(
      (res) => {
          that.ngOnInit()
      },
      (err) =>{
        return
      }
    )
  }
}
