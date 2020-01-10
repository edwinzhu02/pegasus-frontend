import { GeneralRepoService } from './../../../../services/repositories/general-repo.service';
import { Component, OnInit, Output, EventEmitter, AfterViewChecked, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { AppSettingsService } from 'src/app/settings/app-settings.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordModalComponent } from '../../dashboard-components/support/change-password-modal/change-password-modal.component';
import { environment } from 'src/environments/environment.prod';
import { DashboardService } from "src/app/services/http/dashboard.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.css']
})
export class HeaderbarComponent implements OnInit {
  // property from notification-popup component, for clearing red spot in top right corner
  public isCleared: boolean;
  // show messages number in real time
  public msgNumber: number;
  // get close notification command from behavior subject
  public subscription: Subscription;
  public closeNotification: boolean;
  // for server data
  public staffId: number;
  public branchName: string;


  photoUrl: any = environment.photoUrl;
  userDetail =
    {
      img: '../../../../../assets/images/usersimg/testimg.jpg',
      firstName: '',
      lastName: ''
    }


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public settingService: AppSettingsService,
    private modalService: NgbModal,
    private dashboardService: DashboardService,
    private generalRepoService:GeneralRepoService
  ) {
  }

  ngOnInit() {
    this.getUserDetail();
    this.staffId = +localStorage.getItem("staffId");
    if ( localStorage.getItem("Role") =='3' ){
      this.branchName = localStorage.getItem("organisations");
    }
    else
      this.branchName = '';
    
    this.getMsgNumber(this.staffId)
    this.getCloseNotification();
  }


  getUserDetail() {
    this.userDetail['firstName'] = localStorage.getItem('userFirstName');
    this.userDetail['lastName'] = localStorage.getItem('userLastName');
    let photo = localStorage.getItem('photo');
    if (photo)
      this.userDetail.img = this.photoUrl + photo;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    location.reload();
  }
  hideSideBar() {
    this.settingService.sidebarShowStatus.next(!this.settingService.sidebarShowStatus.value)
  }

  changePassword() {
    const modalRef = this.modalService.open(ChangePasswordModalComponent, { size: 'lg' })
  }

  /* get close notification command from behavior subject */
  getCloseNotification() {
    this.subscription = this.dashboardService.popup$.subscribe(
      res => this.closeNotification = res,
      err => alert("Oops, something went wrong!")
    )
  }
  /* click bell to toggle notification */
  handleNotificationPopup(event) {
    this.closeNotification = !this.closeNotification;
    // prevent click event to pass data to dashboard service 
    event.stopPropagation();
  }
  getMsgNumber(staffId: number) {
    // this.dashboardService.getMessages(staffId).subscribe(
    //   res => {

    //     this.msgNumber = res['Data'].length;
    //   },
    //   err => alert("Oops, something went wrong!")
    // )
    this.generalRepoService.newNotifiNumer.subscribe(
      res=>{
        this.msgNumber=res;
      }
    )
  }
}
