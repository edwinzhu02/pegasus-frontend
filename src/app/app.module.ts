import { ColumnTitleFormatPipe } from './shared/pipes/column-title-format.pipe';
// Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from '../app/app-routing.module';
import { FullCalendarModule } from 'ng-fullcalendar';
import { DatePipe, CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

// Guards

// Services
//import { NgbdSortableHeader } from './services/others/ngbootstraptable.service';

// Pipes
import { CommandFormatPipe } from './shared/pipes/command-format.pipe';
import { OrgFormatPipe } from './shared/pipes/org-format.pipe';
import { WeekFormatPipe } from './shared/pipes/week-format.pipe';
import { MyTypePipe } from './shared/pipes/myType-format.pipe';
import { GenderPipe } from './shared/pipes/gender.pipe';
import {RelationshipPipe} from './shared/pipes/relationship.pipe';
import {ReasonLearnPianoPipe} from './shared/pipes/Reason-learn-piano.pipe';
import { HowToKnowPipe } from './shared/pipes/How-To-Know.pipe';
import { CoursespipesPipe } from './shared/pipes/coursespipes.pipe';

// Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/dashboard/general/sidebar/sidebar.component';
import { TimePickerComponent } from './components/dashboard/dashboard-components/time-picker/time-picker.component';
import { LoginComponent } from './components/basic/login/login.component';
import { HeaderbarComponent } from './components/dashboard/general/headerbar/headerbar.component';
import { DashboardPanelComponent } from './components/dashboard/general/dashboard-panel/dashboard-panel.component';
import { SearchNameModuleComponent } from './components/dashboard/dashboard-components/support/search-name-module/search-name-module.component';
import { AdminLearnerPaymentPanelComponent } from './components/dashboard/dashboard-components/admin-payment/admin-learner-payment-panel/admin-learner-payment-panel.component';
import { AdminLearnerPaymentInvoiceComponent } from './components/dashboard/dashboard-components/admin-payment/admin-learner-payment-invoice/admin-learner-payment-invoice.component';
import { AdminLearnerPaymentProductsComponent } from './components/dashboard/dashboard-components/admin-payment/admin-learner-payment-products/admin-learner-payment-products.component';
import { AdminLearnerPaymentRegistrationComponent } from './components/dashboard/dashboard-components/admin-payment/admin-learner-payment-registration/admin-learner-payment-registration.component';
import { AdminLearnerPaymentOtherComponent } from './components/dashboard/dashboard-components/admin-payment/admin-learner-payment-other/admin-learner-payment-other.component';
import { AdminLearnerPaymentSuccessComponent } from './components/dashboard/dashboard-components/admin-payment/admin-learner-payment-success/admin-learner-payment-success.component';
import { FooterComponent } from './components/basic/footer/footer.component';
import { CoursesPanelComponent } from './components/dashboard/dashboard-components/courses/courses-panel/courses-panel.component';
import { CoursesListComponent } from './components/dashboard/dashboard-components/courses/courses-list/courses-list.component';
import { LearnerRegistrationFormComponent } from './components/dashboard/dashboard-components/learner-registration/learner-registration-form/learner-registration-form.component';
import { LearnerRegistrationModalComponent } from './components/dashboard/dashboard-components/learner-registration/learner-registration-modal/learner-registration-modal.component';
import { SessionsPanelComponent } from './components/dashboard/dashboard-components/sessions/sessions-panel/sessions-panel.component';
import { SessionsListViewComponent } from './components/dashboard/dashboard-components/sessions/sessions-views/sessions-list-view/sessions-list-view.component';
import { SessionDetailEditModalComponent } from './components/dashboard/dashboard-components/sessions/session-modals/session-detail-edit-modal/session-detail-edit-modal.component';
import { SessionDetailModalComponent } from './components/dashboard/dashboard-components/sessions/session-modals/session-detail-modal/session-detail-modal.component';
import { AdminLearnerPanelComponent } from './components/dashboard/dashboard-components/admin-learner/admin-learner-panel/admin-learner-panel.component';
import { AdminLearnerListComponent } from './components/dashboard/dashboard-components/admin-learner/admin-learner-list/admin-learner-list.component';
import { InventoryPanelComponent } from './components/dashboard/dashboard-components/inventory/inventory-panel/inventory-panel.component';
import { InventoryListComponent } from './components/dashboard/dashboard-components/inventory/inventory-list/inventory-list.component';
import { AdminInvoiceListComponent } from './components/dashboard/dashboard-components/admin-transactions/admin-invoice-list/admin-invoice-list.component';
import { AdminInvoiceEditModalComponent } from './components/dashboard/dashboard-components/admin-transactions/admin-invoice-edit-modal/admin-invoice-edit-modal.component';
import { PayrollPanelComponent } from './components/dashboard/dashboard-components/admin-payroll/payroll-panel/payroll-panel.component';
import { PayrollListComponent } from './components/dashboard/dashboard-components/admin-payroll/payroll-list/payroll-list.component';
import { TransactionsPanelComponent } from './components/dashboard/dashboard-components/admin-transactions/transactions-panel/transactions-panel.component';
import { AdminPaymentListComponent } from './components/dashboard/dashboard-components/admin-transactions/admin-payment-list/admin-payment-list.component';
import { AdminSalesListComponent } from './components/dashboard/dashboard-components/admin-transactions/admin-sales-list/admin-sales-list.component';
import { SessionsCalendarViewTutorComponent } from './components/dashboard/dashboard-components/sessions/sessions-views/sessions-calendar-view-tutor/sessions-calendar-view-tutor.component';
import { SessionsCalendarViewAdminComponent } from './components/dashboard/dashboard-components/sessions/sessions-views/sessions-calendar-view-admin/sessions-calendar-view-admin.component';
import { TeacherDeleteModalComponent } from './components/dashboard/dashboard-components/teachers/teacher-delete-modal/teacher-delete-modal.component';
import { TeacherDetailModalComponent } from './components/dashboard/dashboard-components/teachers/teacher-detail-modal/teacher-detail-modal.component';
import { TeacherUpdateModalComponent } from './components/dashboard/dashboard-components/teachers/teacher-update-modal/teacher-update-modal.component';
import { TeacherModalFormComponent } from './components/dashboard/dashboard-components/teachers/teacher-modal-form/teacher-modal-form.component';
import { TeacherInfoComponent } from './components/dashboard/dashboard-components/teachers/teacher-info/teacher-info.component';
import { TeacherPanelComponent } from './components/dashboard/dashboard-components/teachers/teacher-panel/teacher-panel.component';
import { CourseDetailModalComponent } from './components/dashboard/dashboard-components/courses/course-detail-modal/course-detail-modal.component';
import { CourseDeleteModalComponent } from './components/dashboard/dashboard-components/courses/course-delete-modal/course-delete-modal.component';
import { TestoneComponent } from './components/testcomponent/testone/testone.component';
import { LearnerDeleteModalComponent } from './components/dashboard/dashboard-components/admin-learner/learner-delete-modal/learner-delete-modal.component';
import { LearnerDetailModalComponent } from './components/dashboard/dashboard-components/admin-learner/learner-detail-modal/learner-detail-modal.component';
import { SessionCancelModalComponent } from './components/dashboard/dashboard-components/sessions/session-modals/session-cancel-modal/session-cancel-modal.component';
import { SessionTutorReportModalComponent } from './components/dashboard/dashboard-components/sessions/session-modals/session-tutor-report-modal/session-tutor-report-modal.component';
import { SessionCompletedModalComponent } from './components/dashboard/dashboard-components/sessions/session-modals/session-completed-modal/session-completed-modal.component';
import { CourseClassListComponent } from './components/dashboard/dashboard-components/courses/course-class-list/course-class-list.component';
import { CourseClassDetailModalComponent } from './components/dashboard/dashboard-components/courses/course-class-detail-modal/course-class-detail-modal.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-components/dashboard-home/dashboard-home.component';
import { TeacherCourseModalComponent } from './components/dashboard/dashboard-components/teachers/teacher-course-modal/teacher-course-modal.component';
import { ChartingComponent } from './components/dashboard/dashboard-components/support/charting/charting.component';
import { RatingModalComponent } from './components/dashboard/dashboard-components/support/rating-modal/rating-modal.component';
import { ForgotPasswordModalComponent } from './components/basic/forgot-password-modal/forgot-password-modal.component';
import { ChangePasswordModalComponent } from './components/dashboard/dashboard-components/support/change-password-modal/change-password-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardPanelComponent,
    HeaderbarComponent,
    SidebarComponent,
    AdminLearnerPaymentPanelComponent,
    SearchNameModuleComponent,
    AdminLearnerPaymentInvoiceComponent,
    AdminLearnerPaymentProductsComponent,
    AdminLearnerPaymentRegistrationComponent,
    AdminLearnerPaymentOtherComponent,
    AdminLearnerPaymentSuccessComponent,
    TimePickerComponent,
    FooterComponent,
    CoursesPanelComponent,
    CoursesListComponent,
    OrgFormatPipe,
    WeekFormatPipe,
    LearnerRegistrationFormComponent,
    LearnerRegistrationModalComponent,
    CommandFormatPipe,
    SessionsPanelComponent,
    SessionsListViewComponent,
    SessionDetailEditModalComponent,
    SessionDetailModalComponent,
    AdminLearnerPanelComponent,
    AdminLearnerListComponent,
    InventoryPanelComponent,
    InventoryListComponent,
    AdminInvoiceListComponent,
    AdminInvoiceEditModalComponent,
    MyTypePipe,
    PayrollPanelComponent,
    PayrollListComponent,
    TransactionsPanelComponent,
    AdminPaymentListComponent,
    AdminSalesListComponent,
    SessionsCalendarViewTutorComponent,
    SessionsCalendarViewAdminComponent,
    TeacherInfoComponent,
    TeacherDeleteModalComponent,
    TeacherDetailModalComponent,
    TeacherUpdateModalComponent,
    TeacherModalFormComponent,
    TeacherPanelComponent,
    CourseDetailModalComponent,
    CourseDeleteModalComponent,
    TestoneComponent,

    LearnerDeleteModalComponent,
    LearnerDetailModalComponent,


    SessionCancelModalComponent,
    SessionTutorReportModalComponent,
    SessionCompletedModalComponent,
    GenderPipe,
    RelationshipPipe,
    ReasonLearnPianoPipe,
    HowToKnowPipe,
    ColumnTitleFormatPipe,
    CourseClassListComponent,
    CourseClassDetailModalComponent,
    DashboardHomeComponent,
    CoursespipesPipe,
    TeacherCourseModalComponent,
    ChartingComponent,
    RatingModalComponent,
    ForgotPasswordModalComponent,
    ChangePasswordModalComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    routing,
    FullCalendarModule,
    CommonModule,
    ChartsModule
  ],
  providers: [
    DatePipe,
    CoursespipesPipe
  ],
  entryComponents:[
    TeacherDeleteModalComponent,
    TeacherDetailModalComponent,
    TeacherUpdateModalComponent,
    TeacherCourseModalComponent,
    AdminInvoiceEditModalComponent,
    CourseDeleteModalComponent,
    CourseDetailModalComponent,
    SessionDetailEditModalComponent,
    CourseClassDetailModalComponent,
    LearnerDeleteModalComponent,
    LearnerDetailModalComponent,
    SessionCancelModalComponent,
    SessionCompletedModalComponent,
    RatingModalComponent,
    ForgotPasswordModalComponent,
    ChangePasswordModalComponent
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
