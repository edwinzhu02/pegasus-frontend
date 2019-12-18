import { Component, Input, OnInit ,ViewChild,ElementRef} from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { SessionsService } from "../../../../../../services/http/sessions.service";
import { SessionEdit } from "../../../../../../models/SessionEdit";
import Swal from "sweetalert2";
import { TrialCalendarComponent } from "../../../trial-course/trial-calendar/trial-calendar.component";

@Component({
  selector: "app-session-detail-edit-modal",
  templateUrl: "./session-detail-edit-modal.component.html",
  styleUrls: ["./session-detail-edit-modal.component.css"]
})
export class SessionDetailEditModalComponent implements OnInit {
  @Input() LessonModel;
  @ViewChild('tempTeacherCheckbox') tempTeacherRef:ElementRef;
  isloading = false;
  isEditSuccess = false;
  isEditFail = false;
  ConfirmClick = false;
  public errorMsg;
  public hasError = false;
  public SessionForm;
  BranchSelects: any;
  RoomSelects: any;
  TeacherSelects: any;
  Teachers:any;
  duration: number;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public modalService: NgbModal,
    private sessionsService: SessionsService
  ) {}

  // set access porperty of SessionForm
  get Branch() {
    return this.SessionForm.get("Branch");
  }

  get Reason() {
    return this.SessionForm.get("Reason");
  }

  get Room() {
    return this.SessionForm.get("Room");
  }

  get Teacher() {
    return this.SessionForm.get("Teacher");
  }

  ngOnInit() {
    this.SessionForm = this.fb.group({
      CourseName: [this.LessonModel.CourseName],
      Room: ["", [Validators.required]],
      BeginTime: [this.LessonModel.BeginTime],
      Teacher: ["", [Validators.required]],
      Branch: ["", [Validators.required]],
      Reason: ["", [Validators.required]]
    });
    this.getBranchs();
    this.getAllTeachers();
  }

  getRooms = () => {
    const dateDiff =
      +new Date(this.LessonModel.EndTime) -
      +new Date(this.LessonModel.BeginTime);
    if (
      !this.Branch.touched ||
      this.Branch.invalid ||
      (!this.Teacher.touched || this.Teacher.invalid)
    ) {
      return;
    }
    this.sessionsService
      .GetSessionEditRoom(
        this.SessionForm.value.Teacher,
        this.SessionForm.value.Branch,
        this.SessionForm.value.BeginTime
      )
      .subscribe(res => {
        if (res.Data.length === 0) {
          const EditBeginTime = new Date(this.SessionForm.value.BeginTime);
          const EditEndTime = new Date(this.SessionForm.value.BeginTime);
          EditEndTime.setMinutes(
            EditBeginTime.getMinutes() + dateDiff / 60 / 1000
          );
          const BeginTime =
            EditBeginTime.getFullYear() +
            "-" +
            ((EditBeginTime.getMonth() + 1).toString().length === 1
              ? "0" + (EditBeginTime.getMonth() + 1).toString()
              : (EditBeginTime.getMonth() + 1).toString()) +
            "-" +
            EditBeginTime.getDate() +
            "T" +
            (EditBeginTime.getHours().toString().length === 1
              ? "0" + EditBeginTime.getHours().toString()
              : EditBeginTime.getHours().toString()) +
            ":" +
            (EditBeginTime.getMinutes().toString().length === 1
              ? "0" + EditBeginTime.getMinutes().toString()
              : EditBeginTime.getMinutes());
          const EndTime =
            EditEndTime.getFullYear() +
            "-" +
            ((EditEndTime.getMonth() + 1).toString().length === 1
              ? "0" + (EditEndTime.getMonth() + 1).toString()
              : (EditEndTime.getMonth() + 1).toString()) +
            "-" +
            EditEndTime.getDate() +
            "T" +
            (EditEndTime.getHours().toString().length === 1
              ? "0" + EditEndTime.getHours().toString()
              : EditEndTime.getHours().toString()) +
            ":" +
            (EditEndTime.getMinutes().toString().length === 1
              ? "0" + EditEndTime.getMinutes().toString()
              : EditEndTime.getMinutes());
          this.sessionsService
            .GetSessionEditRoomTwo(
              this.SessionForm.value.Branch,
              BeginTime,
              EndTime
            )
            .subscribe(data => {
              this.RoomSelects = data.Data;
            });
        } else {
          this.RoomSelects = res.Data;
        }
      });
  };

  getBranchs = () => {
    this.sessionsService.GetTeachherFilter(this.LessonModel.courseId).subscribe(
      res => {
        this.BranchSelects = res.Data;
      },
      err => {
        alert("Something ERR");
      }
    );
  };
  getAllTeachers = ()=>{
    this.sessionsService.getTeachers().subscribe(
      res=>{
        this.Teachers=res['Data']
      },
      err=>{
        alert("Something ERR");
      }
    )
  }
  getTeachers = (branchId: number) => {
    if (this.tempTeacherRef.nativeElement.checked!=true)
      this.TeacherSelects = this.BranchSelects.filter(
        s => s.OrgId === branchId
      )[0].Teacher;
    else
      this.TeacherSelects = this.Teachers;
  };

  // confirm Modal
  open(confirmModal) {
    if (this.SessionForm.invalid) {
      this.errorMsg = "The form is invalid.";
      this.hasError = true;
    } else {
      this.hasError = false;
      this.modalService.open(confirmModal);
    }
  }

  openTimePicker = () => {
    const orgId: number = +this.SessionForm.get("Branch").value;
    const orgName: string = this.BranchSelects.find(
      branch => branch.OrgId === orgId
    ).OrgName;
    const teacherId = +this.SessionForm.get("Teacher").value;
    this.duration =
      new Date(this.LessonModel.EndTime).getTime() -
      new Date(this.LessonModel.BeginTime).getTime();

    const modalRef = this.modalService.open(TrialCalendarComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false
    });
    modalRef.componentInstance.teacherId = teacherId;
    modalRef.componentInstance.orgName = orgName;
    modalRef.componentInstance.orgId = orgId;
    modalRef.componentInstance.duration = this.duration;
    modalRef.componentInstance.userSelectedTime.subscribe(res => {
      this.SessionForm.get("BeginTime").patchValue(res);
    });
  };

  ConfrimEdit = () => {
    this.isloading = true;
    this.ConfirmClick = true;
    const sessionEdit = new SessionEdit(
      this.LessonModel.LessonId,
      this.LessonModel.LearnerId,
      +this.SessionForm.value.Room,
      +this.SessionForm.value.Teacher,
      +this.SessionForm.value.Branch,
      this.SessionForm.value.Reason,
      this.SessionForm.value.BeginTime
    );

    this.sessionsService.SessionEdit(sessionEdit).subscribe(
      res => {
        this.isEditSuccess = true;
        this.isloading = false;
        setTimeout(() => {
          this.activeModal.dismiss("Cross click");
        }, 1000);
      },
      err => {
        this.isEditFail = true;
        this.isloading = false;
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: err.error.ErrorMessage
        });
      }
    );
  };
}
