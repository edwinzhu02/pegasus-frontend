import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validator, Validators, RequiredValidator } from '@angular/forms';
import { TransactionService } from '../../../../../../services/http/transaction.service';
import {SessionsService} from '../../../../../../services/http/sessions.service';
import {SessionEdit} from '../../../../../../models/SessionEdit';

@Component({
  selector: 'app-session-detail-edit-modal',
  templateUrl: './session-detail-edit-modal.component.html',
  styleUrls: ['./session-detail-edit-modal.component.css'],
})
export class SessionDetailEditModalComponent implements OnInit {
  @Input() LessonModel;
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
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public modalService: NgbModal,
    private transactionService: TransactionService,
    private router: Router,
    private sessionsService: SessionsService,
  ) {

  }

  // set access porperty of SessionForm
  get Branch() {
    return this.SessionForm.get('Branch');
  }

  get Reason() {
    return this.SessionForm.get('Reason');
  }

  get Room() {
    return this.SessionForm.get('Room');
  }

  get Teacher() {
    return this.SessionForm.get('Teacher');
  }

  ngOnInit() {
    this.SessionForm = this.fb.group({
      CourseName: [this.LessonModel.CourseName],
      Room: ['', [Validators.required]],
      BeginTime: [this.LessonModel.BeginTime],
      Teacher: ['', [Validators.required]],
      Branch: ['', [Validators.required]],
      EndTime: [this.LessonModel.EndTime],
      Reason: ['', [Validators.required]]
    });
    this.getBranchs();

  }


  getBranchs = () => {
    this.sessionsService.GetTeachherFilter(this.LessonModel.courseId).subscribe(res=>{
      this.BranchSelects = res.Data;
    },err => {
      alert('Something ERR');
    });
  }

  getRooms = (branchId) => {
    this.RoomSelects = this.BranchSelects.filter(s => s.OrgId == branchId)[0].Room;
  }

  getTeachers = (branchId) =>{
    this.TeacherSelects = this.BranchSelects.filter(s => s.OrgId == branchId)[0].Teacher;
  }

// confirm Modal
  open(confirmModal) {
    if (this.SessionForm.invalid) {
      this.errorMsg = 'The form is invalid.';
      this.hasError = true;
    } else {
      this.hasError = false;
      this.modalService.open(confirmModal);
    }
  }

  ConfrimEdit = () => {
    this.isloading = true;
    this.ConfirmClick = true;
    const sessionEdit = new SessionEdit(this.LessonModel.LessonId,
      this.LessonModel.LearnerId, parseInt(this.SessionForm.value.Room),
      parseInt(this.SessionForm.value.Teacher), parseInt(this.SessionForm.value.Branch), this.SessionForm.value.Reason,
      this.SessionForm.value.BeginTime,this.SessionForm.value.EndTime);

    this.sessionsService.SessionEdit(sessionEdit).subscribe(res => {
      this.isEditSuccess = true;
      this.isloading = false;
    }, err => {
      this.isEditFail = true;
    });
  }
}
