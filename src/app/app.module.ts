import { CommonModule, DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
// Dependencies
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FullCalendarModule } from "ng-fullcalendar";
import { ChartsModule } from "ng2-charts";
import { routing } from "../app/app-routing.module";

// Components
import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/basic/footer/footer.component";
import { ForgotPasswordModalComponent } from "./components/basic/forgot-password-modal/forgot-password-modal.component";
import { LoginComponent } from "./components/basic/login/login.component";
import { AdminLearnerListComponent } from "./components/dashboard/dashboard-components/admin-learner/admin-learner-list/admin-learner-list.component";
import { AdminLearnerPanelComponent } from "./components/dashboard/dashboard-components/admin-learner/admin-learner-panel/admin-learner-panel.component";
import { LearnerDeleteModalComponent } from "./components/dashboard/dashboard-components/admin-learner/learner-delete-modal/learner-delete-modal.component";
import { LearnerDetailModalComponent } from "./components/dashboard/dashboard-components/admin-learner/learner-detail-modal/learner-detail-modal.component";
import { LearnerEditModalComponent } from "./components/dashboard/dashboard-components/admin-learner/learner-edit-modal/learner-edit-modal.component";
import { LearnerAddModalComponent } from "./components/dashboard/dashboard-components/admin-learner/learner-add-modal/learner-add-modal.component";
import { LearnerDeleteCourseModalComponent } from "./components/dashboard/dashboard-components/admin-learner/learner-delete-course-modal/learner-delete-course-modal.component";
import { AdminLearnerPaymentInvoiceComponent } from "./components/dashboard/dashboard-components/admin-payment/admin-learner-payment-invoice/admin-learner-payment-invoice.component";
import { AdminLearnerPaymentOtherComponent } from "./components/dashboard/dashboard-components/admin-payment/admin-learner-payment-other/admin-learner-payment-other.component";
import { AdminLearnerPaymentPanelComponent } from "./components/dashboard/dashboard-components/admin-payment/admin-learner-payment-panel/admin-learner-payment-panel.component";
import { AdminLearnerPaymentProductsComponent } from "./components/dashboard/dashboard-components/admin-payment/admin-learner-payment-products/admin-learner-payment-products.component";
import { AdminLearnerPaymentRegistrationComponent } from "./components/dashboard/dashboard-components/admin-payment/admin-learner-payment-registration/admin-learner-payment-registration.component";
import { AdminLearnerPaymentSuccessComponent } from "./components/dashboard/dashboard-components/admin-payment/admin-learner-payment-success/admin-learner-payment-success.component";
import { AdminLearnerProfileComponent } from "./components/dashboard/dashboard-components/admin-learner/admin-learner-profile/admin-learner-profile.component";
import { AdminLearnerTimetableComponent } from "./components/dashboard/dashboard-components/admin-learner/admin-learner-timetable/admin-learner-timetable.component";
import { PayrollListComponent } from "./components/dashboard/dashboard-components/admin-payroll/payroll-list/payroll-list.component";
import { PayrollPanelComponent } from "./components/dashboard/dashboard-components/admin-payroll/payroll-panel/payroll-panel.component";
import { AdminInvoiceEditModalComponent } from "./components/dashboard/dashboard-components/admin-transactions/admin-invoice-edit-modal/admin-invoice-edit-modal.component";
import { AdminInvoiceListComponent } from "./components/dashboard/dashboard-components/admin-transactions/admin-invoice-list/admin-invoice-list.component";
import { AdminPaymentListComponent } from "./components/dashboard/dashboard-components/admin-transactions/admin-payment/admin-payment-list/admin-payment-list.component";
import { AdminSalesListComponent } from "./components/dashboard/dashboard-components/admin-transactions/admin-sales-list/admin-sales-list.component";
import { TransactionsPanelComponent } from "./components/dashboard/dashboard-components/admin-transactions/transactions-panel/transactions-panel.component";
import { CourseClassDetailModalComponent } from "./components/dashboard/dashboard-components/courses/course-class-detail-modal/course-class-detail-modal.component";
import { CourseClassListComponent } from "./components/dashboard/dashboard-components/courses/course-class-list/course-class-list.component";

import { CourseSessionListModalComponent } from "./components/dashboard/dashboard-components/courses/course-session-list-modal/course-session-list-modal.component";

import { CourseDeleteModalComponent } from "./components/dashboard/dashboard-components/courses/course-delete-modal/course-delete-modal.component";
import { CourseDetailModalComponent } from "./components/dashboard/dashboard-components/courses/course-detail-modal/course-detail-modal.component";
import { CoursesListComponent } from "./components/dashboard/dashboard-components/courses/courses-list/courses-list.component";
import { CancelledLessonListComponent } from "./components/dashboard/dashboard-components/courses/course-class-list/cancelled-lesson-list/cancelled-lesson-list.component";
import { CoursesPanelComponent } from "./components/dashboard/dashboard-components/courses/courses-panel/courses-panel.component";
import { DashboardHomeComponent } from "./components/dashboard/dashboard-components/dashboard-home/dashboard-home.component";
import { InventoryListComponent } from "./components/dashboard/dashboard-components/inventory/inventory-list/inventory-list.component";
import { InventoryPanelComponent } from "./components/dashboard/dashboard-components/inventory/inventory-panel/inventory-panel.component";
import { LearnerRegistrationFormComponent } from "./components/dashboard/dashboard-components/learner-registration/learner-registration-form/learner-registration-form.component";
import { LearnerRegistrationModalComponent } from "./components/dashboard/dashboard-components/learner-registration/learner-registration-modal/learner-registration-modal.component";
import { LearnerRegistrationConfirmModalComponent } from "./components/dashboard/dashboard-components/learner-registration/learner-registration-confirm-modal/learner-registration-confirm-modal.component";

import { SessionCancelModalComponent } from "./components/dashboard/dashboard-components/sessions/session-modals/session-cancel-modal/session-cancel-modal.component";
import { SessionTrialModalComponent } from "./components/dashboard/dashboard-components/sessions/session-modals/session-trial-modal/session-trial-modal.component";
import { SessionCompletedModalComponent } from "./components/dashboard/dashboard-components/sessions/session-modals/session-completed-modal/session-completed-modal.component";
import { SessionDetailEditModalComponent } from "./components/dashboard/dashboard-components/sessions/session-modals/session-detail-edit-modal/session-detail-edit-modal.component";
import { GroupSessionDetailEditModalComponent } from "./components/dashboard/dashboard-components/courses/course-class-list/session-detail-edit-modal/group-session-detail-edit-modal.component";
import { SessionDetailModalComponent } from "./components/dashboard/dashboard-components/sessions/session-modals/session-detail-modal/session-detail-modal.component";
import { SessionTutorReportModalComponent } from "./components/dashboard/dashboard-components/sessions/session-modals/session-tutor-report-modal/session-tutor-report-modal.component";
import { SessionsPanelComponent } from "./components/dashboard/dashboard-components/sessions/sessions-panel/sessions-panel.component";
import { SessionsCalendarViewAdminComponent } from "./components/dashboard/dashboard-components/sessions/sessions-views/sessions-calendar-view-admin/sessions-calendar-view-admin.component";
import { SessionsCalendarViewTutorComponent } from "./components/dashboard/dashboard-components/sessions/sessions-views/sessions-calendar-view-tutor/sessions-calendar-view-tutor.component";
import { SessionsListViewComponent } from "./components/dashboard/dashboard-components/sessions/sessions-views/sessions-list-view/sessions-list-view.component";
import { StockApplicationListComponent } from "./components/dashboard/dashboard-components/inventory/inventory-stock-application/stock-application-list/stock-application-list.component";
import { StockApplicationUpdateModalComponent } from "./components/dashboard/dashboard-components/inventory/inventory-stock-application/stock-application-update-modal/stock-application-update-modal.component";
import { StockApplicationDetailModalComponent } from ".//components/dashboard/dashboard-components/inventory/inventory-stock-application/stock-application-detail-modal/stock-application-detail-modal.component";
import { ChangePasswordModalComponent } from "./components/dashboard/dashboard-components/support/change-password-modal/change-password-modal.component";
import { ChartingComponent } from "./components/dashboard/dashboard-components/support/charting/charting.component";
import { RatingModalComponent } from "./components/dashboard/dashboard-components/support/rating-modal/rating-modal.component";
import { SearchNameModuleComponent } from "./components/dashboard/dashboard-components/support/search-name-module/search-name-module.component";
import { TeacherCourseModalComponent } from "./components/dashboard/dashboard-components/teachers/teacher-course-modal/teacher-course-modal.component";
import { TeacherDeleteModalComponent } from "./components/dashboard/dashboard-components/teachers/teacher-delete-modal/teacher-delete-modal.component";
import { TeacherDetailModalComponent } from "./components/dashboard/dashboard-components/teachers/teacher-detail-modal/teacher-detail-modal.component";
import { TeacherInfoComponent } from "./components/dashboard/dashboard-components/teachers/teacher-info/teacher-info.component";
import { TeacherModalFormComponent } from "./components/dashboard/dashboard-components/teachers/teacher-modal-form/teacher-modal-form.component";
import { TeacherPanelComponent } from "./components/dashboard/dashboard-components/teachers/teacher-panel/teacher-panel.component";
import { TeacherUpdateModalComponent } from "./components/dashboard/dashboard-components/teachers/teacher-update-modal/teacher-update-modal.component";
import { TimePickerComponent } from "./components/dashboard/dashboard-components/time-picker/time-picker.component";
import { DashboardPanelComponent } from "./components/dashboard/general/dashboard-panel/dashboard-panel.component";
import { HeaderbarComponent } from "./components/dashboard/general/headerbar/headerbar.component";
import { SidebarComponent } from "./components/dashboard/general/sidebar/sidebar.component";
import { TestoneComponent } from "./components/testcomponent/testone/testone.component";
import { LearnerItemComponent } from "./shared/components/learner-item/learner-item.component";
import { ModelTemplateComponent } from "./shared/components/model-template/model-template.component";
import { ColumnTitleFormatPipe } from "./shared/pipes/column-title-format.pipe";
// Guards
// Services
//import { NgbdSortableHeader } from './services/others/ngbootstraptable.service';
// Pipes
import { CommandFormatPipe } from "./shared/pipes/command-format.pipe";
import { GenderPipe } from "./shared/pipes/gender.pipe";
import { MyTypePipe } from "./shared/pipes/myType-format.pipe";
import { OrgFormatPipe } from "./shared/pipes/org-format.pipe";
import { RelationshipPipe } from "./shared/pipes/relationship.pipe";
import { WeekFormatPipe } from "./shared/pipes/week-format.pipe";
import { PaymentPeriodPipe } from "./shared/pipes/paymentPeriod.pipe";
import { IsUnder18Pipe } from "./shared/pipes/isUnder18.pipe";
import { confirmEqualValidatorDirectie } from "./shared/confirm-equal-validator.directive";
import { RemindModalComponent } from "./components/dashboard/dashboard-components/remind/remind-modal/remind-modal.component";
import { RemindListComponent } from "./components/dashboard/dashboard-components/remind/remind-list/remind-list.component";
import { RemindPanelComponent } from "./components/dashboard/dashboard-components/remind/remind-panel/remind-panel.component";

import { StaffListComponent } from "./components/dashboard/dashboard-components/admin-staff/Staff-list/Staff-list.component";

import { CustomErrorHandler } from "./services/errorhandler/CustomErrorHandler";
import { SimplifyOrgPipe } from "./shared/pipes/simplify-org.pipe";
import { LearnerCreditPanelComponent } from "./components/dashboard/dashboard-components/learner-credit/learner-credit-panel/learner-credit-panel.component";
import { LearnerCreditDetailsComponent } from "./components/dashboard/dashboard-components/learner-credit/learner-credit-details/learner-credit-details.component";
import { OrderbyPipe } from "./shared/pipes/orderby.pipe";
import { SessionRescheduleModalComponent } from "./components/dashboard/dashboard-components/sessions/session-modals/session-reschedule-modal/session-reschedule-modal.component";
import { MondayDateInWeekByDatePipe } from "./shared/pipes/monday-date-in-week-by-date.pipe";
import { AdminLearnerLeaveComponent } from "./components/dashboard/dashboard-components/admin-learner/admin-learner-leave/admin-learner-leave.component";
import { AdminLearnerCourseEditComponent } from "./components/dashboard/dashboard-components/admin-learner/admin-learner-course-edit/admin-learner-course-edit.component";
import { AdminLearnerPeriodCourseChangeModalComponent } from "./components/dashboard/dashboard-components/admin-learner/admin-learner-period-course-change-modal/admin-learner-period-course-change-modal.component";
import { AdminLearnerNameComponent } from "./components/dashboard/dashboard-components/admin-learner/admin-learner-name/admin-learner-name.component";
import { StaffDeleteModalComponent } from "./components/dashboard/dashboard-components/admin-staff/staff-delete-modal/staff-delete-modal.component";
import { StaffDetailModalComponent } from "./components/dashboard/dashboard-components/admin-staff/staff-detail-modal/staff-detail-modal.component";
import { StaffEditModalComponent } from "./components/dashboard/dashboard-components/admin-staff/staff-edit-modal/staff-edit-modal.component";
import { StaffModalFormComponent } from "./components/dashboard/dashboard-components/admin-staff/staff-modal-form/staff-modal-form.component";
import { InventoryDetailModalComponent } from "./components/dashboard/dashboard-components/inventory/inventory-detail-modal/inventory-detail-modal.component";
import { InventoryReceiptModalComponent } from "./components/dashboard/dashboard-components/inventory/inventory-receipt-modal/inventory-receipt-modal.component";
import { HolidayCalendarComponent } from "./components/dashboard/dashboard-components/admin-holidays/holiday-calendar/holiday-calendar.component";

import { DeleteHolidayComponent } from "./components/dashboard/dashboard-components/admin-holidays/delete-holiday/delete-holiday.component";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { MessagerIconComponent } from "./components/dashboard/general/messager/messager-icon/messager-icon.component";
import { MessagerModalComponent } from "./components/dashboard/general/messager/messager-modal/messager-modal.component";
import { MessagerSubscribersComponent } from "./components/dashboard/general/messager/messager-subscribers/messager-subscribers.component";
import { MessagerRecentlyComponent } from "./components/dashboard/general/messager/messager-recently/messager-recently.component";
import { MessagerChattingComponent } from "./components/dashboard/general/messager/messager-chatting/messager-chatting.component";
import { MessagerPersonalInfoComponent } from "./components/dashboard/general/messager/messager-personal-info/messager-personal-info.component";
import { AdminPaymentProductModalComponent } from "./components/dashboard/dashboard-components/admin-transactions/admin-payment/admin-payment-product-modal/admin-payment-product-modal.component";
import { AdminPaymentConfirmModalComponent } from "./components/dashboard/dashboard-components/admin-transactions/admin-payment/admin-payment-confirm-modal/admin-payment-confirm-modal.component";
import { AmendmentHistoryModalComponent } from "./components/dashboard/dashboard-components/admin-learner/amendment-History-modal/amendment-History-modal.component";
import { IsTemporaryPipe } from "./shared/pipes/IsTemporary.pipe";
import { SelectHolidaysModalComponent } from "./components/dashboard/dashboard-components/admin-holidays/select-holidays-modal/select-holidays-modal.component";
import { CoporateOrderApplicationComponent } from "./components/dashboard/dashboard-components/admin-inventory-application-dispatch/coporate-order-application/coporate-order-application.component";
import { PageGroupDetailsComponent } from "./components/dashboard/dashboard-components/admin-pageGroup/pageGroup-details/pageGroup-details.component";
import { PageGroupDeleteComponent } from "./components/dashboard/dashboard-components/admin-pageGroup/pageGroup-delete/pageGroup-delete.component";
import { PageGroupEditComponent } from "./components/dashboard/dashboard-components/admin-pageGroup/pageGroup-edit/pageGroup-edit.component";
import { PageGroupListComponent } from "./components/dashboard/dashboard-components/admin-pageGroup/pageGroup-list/pageGroup-list.component";
import { PageGroupFormComponent } from "./components/dashboard/dashboard-components/admin-pageGroup/pageGroup-form/pageGroup-form.component";
import { MessagerNotificationComponent } from "./components/dashboard/general/messager/messager-notification/messager-notification.component";
import { ConflictCheckComponent } from "./components/dashboard/dashboard-components/conflict-check/conflict-check/conflict-check.component";
import { StockApplicationFormComponent } from "./components/dashboard/dashboard-components/inventory/inventory-stock-application/stock-application-form/stock-application-form.component";
import { NewLearnerRegistrationModalComponent } from "./components/dashboard/dashboard-components/admin-learner/New-Learner-Registration-modal/New-Learner-Registration-modal.component";
import { NewRegistrationFormComponent } from "./components/dashboard/dashboard-components/admin-learner/New-Registration-Form/New-Registration-Form.component";
import { TutorsInfomationComponent } from "./components/dashboard/dashboard-components/tutors/tutors-infomation/tutors-infomation.component";
import { StockApplicationReplyModalComponent } from "./components/dashboard/dashboard-components/inventory/inventory-stock-application/stock-application-reply-modal/stock-application-reply-modal.component";
import { StockApplicationDeliverModalComponent } from "./components/dashboard/dashboard-components/inventory/inventory-stock-application/stock-application-deliver-modal/stock-application-deliver-modal.component";
import { StockApplicationReceiveModalComponent } from "./components/dashboard/dashboard-components/inventory/inventory-stock-application/stock-application-receive-modal/stock-application-receive-modal.component";
import { StockApplicationProcessStatusComponent } from "./components/dashboard/dashboard-components/inventory/inventory-stock-application/stock-application-process-status/stock-application-process-status.component";

import { TrialFilterComponent } from "./components/dashboard/dashboard-components/trial-course/trial-filter/trial-filter.component";
import { PayListComponent } from "./components/dashboard/dashboard-components/admin-staff/pay-list/pay-list.component";
import { TeacherLevelPipe } from "./shared/pipes/teacher-level.pipe";
import { StockApplicationProcessModalComponent } from "./components/dashboard/dashboard-components/inventory/inventory-stock-application/stock-application-process-modal/stock-application-process-modal.component";
import { TrialCalendarComponent } from "./components/dashboard/dashboard-components/trial-course/trial-calendar/trial-calendar.component";
import { TrialConfirmationComponent } from "./components/dashboard/dashboard-components/trial-course/trial-confirmation/trial-confirmation.component";
import { ProcessStatusPipe } from "src/app/shared/pipes/process-status.pipe";
import { NotificationPopupComponent } from "./components/dashboard/general/notifications/notification-popup/notification-popup.component";
import { TrialInfoComponent } from "./components/dashboard/dashboard-components/trial-course/trial-info/trial-info.component";
import { RegistrationToParentComponent } from "./components/dashboard/dashboard-components/admin-learner/registration-To-parent/registration-To-parent.component";
import { ParentRegistrationFormComponent } from "./components/dashboard/dashboard-components/admin-learner/parent-Registration-Form/parent-Registration-Form.component";

import { BookcourseComponent } from "./components/dashboard/dashboard-components/learner-registration/bookcourse/bookcourse.component";
import { BookcoursetestComponent } from "./components/dashboard/dashboard-components/bookcourse/bookcoursetest/bookcoursetest.component";
import { GroupcourseComponent } from "./components/dashboard/dashboard-components/bookcourse/groupcourse/groupcourse.component";

import { RelativeTimePipe } from "./shared/pipes/relative-time.pipe";
import { QuarterToMinsPipe } from "./shared/pipes/quarter-to-mins.pipe";

import { ReasonInputComponent } from './components/dashboard/dashboard-components/support/reason-Input/reason-Input.component';
import { LearnerAddModalTestComponent } from "./components/dashboard/dashboard-components/admin-learner/learner-add-modal-test/learner-add-modal-test.component";
import { PublishPanelComponent } from "./components/dashboard/dashboard-components/admin-publish/publish-panel/publish-panel.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MakeupLessonComponent } from './shared/components/makeup-lesson/makeup-lesson.component';
import { AdminNoticeComponent } from './components/dashboard/dashboard-components/admin-notice/admin-notice.component';
import { TodoListComponent } from './components/dashboard/dashboard-components/admin-notice/todo-list/todo-list.component';
import { LearnerFilterComponent } from './shared/components/learner-filter/learner-filter.component';
import { SessionsTopviewsComponent } from './components/dashboard/dashboard-components/sessions/sessions-topviews/sessions-topviews.component';
import { TimePickerOrgComponent } from './components/dashboard/dashboard-components/time-picker-org/time-picker-org.component';
import { AdminLearnerPaymentComponent } from './components/dashboard/dashboard-components/admin-learner/admin-learner-payment/admin-learner-payment.component';
import { AdminSendPaymentEmailComponent } from './components/dashboard/dashboard-components/admin-learner/admin-send-payment-email/admin-send-payment-email.component';
import { SessionCalendarViewGroupCoursesComponent } from './components/dashboard/dashboard-components/sessions/sessions-views/session-calendar-view-group-courses/session-calendar-view-group-courses.component';
import { TimerPickerBranchComponent } from './components/dashboard/dashboard-components/timer-picker-branch/timer-picker-branch.component';
import { MessgeboardComponent } from './components/messgeboard/messgeboard.component';
import { BoardmodelComponent } from './components/messgeboard/boardmodel/boardmodel.component';
import { BoardpageComponent } from './components/messgeboard/boardpage/boardpage.component';

@NgModule({
  declarations: [
    PageGroupFormComponent,
    PageGroupListComponent,
    PageGroupEditComponent,
    PageGroupDeleteComponent,
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
    AdminLearnerProfileComponent,
    AdminLearnerNameComponent,
    AdminLearnerTimetableComponent,
    TimePickerComponent,
    FooterComponent,
    CoursesPanelComponent,
    CoursesListComponent,
    CourseClassListComponent,
    GroupSessionDetailEditModalComponent,
    CourseSessionListModalComponent,
    OrgFormatPipe,
    WeekFormatPipe,
    QuarterToMinsPipe,
    LearnerRegistrationFormComponent,
    LearnerRegistrationModalComponent,
    LearnerRegistrationConfirmModalComponent,
    MakeupLessonComponent,
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
    LearnerItemComponent,
    ModelTemplateComponent,
    LearnerDeleteModalComponent,
    LearnerDetailModalComponent,
    LearnerEditModalComponent,
    LearnerAddModalComponent,
    LearnerDeleteCourseModalComponent,
    AmendmentHistoryModalComponent,
    IsTemporaryPipe,
    SessionCancelModalComponent,
    SessionTrialModalComponent,
    SessionTutorReportModalComponent,
    SessionCompletedModalComponent,
    GenderPipe,
    RelationshipPipe,
    RelativeTimePipe,
    ColumnTitleFormatPipe,
    MondayDateInWeekByDatePipe,
    CancelledLessonListComponent,
    CourseClassDetailModalComponent,
    DashboardHomeComponent,
    TeacherCourseModalComponent,
    ChartingComponent,
    RatingModalComponent,
    ForgotPasswordModalComponent,
    ChangePasswordModalComponent,
    TrialInfoComponent,
    PaymentPeriodPipe,
    IsUnder18Pipe,
    confirmEqualValidatorDirectie,
    RemindModalComponent,
    RemindListComponent,
    RemindPanelComponent,
    StaffListComponent,
    ProcessStatusPipe,
    StockApplicationListComponent,
    StockApplicationUpdateModalComponent,
    StockApplicationDetailModalComponent,
    SimplifyOrgPipe,
    LearnerCreditPanelComponent,
    LearnerCreditDetailsComponent,
    OrderbyPipe,
    SessionRescheduleModalComponent,
    MondayDateInWeekByDatePipe,
    AdminLearnerLeaveComponent,
    AdminLearnerCourseEditComponent,
    AdminLearnerPeriodCourseChangeModalComponent,
    StaffModalFormComponent,
    StaffDeleteModalComponent,
    StaffDetailModalComponent,
    StaffEditModalComponent,
    InventoryDetailModalComponent,
    InventoryReceiptModalComponent,
    HolidayCalendarComponent,
    DeleteHolidayComponent,
    MessagerIconComponent,
    MessagerModalComponent,
    MessagerSubscribersComponent,
    MessagerRecentlyComponent,
    MessagerChattingComponent,
    MessagerPersonalInfoComponent,
    AdminPaymentProductModalComponent,
    AdminPaymentConfirmModalComponent,

    SelectHolidaysModalComponent,

    CoporateOrderApplicationComponent,
    PageGroupDetailsComponent,

    MessagerNotificationComponent,
    ConflictCheckComponent,
    StockApplicationFormComponent,
    PayListComponent,
    LearnerFilterComponent,
    NewLearnerRegistrationModalComponent,
    NewRegistrationFormComponent,
    RegistrationToParentComponent,
    ParentRegistrationFormComponent,
    TutorsInfomationComponent,
    StockApplicationReplyModalComponent,
    StockApplicationDeliverModalComponent,
    StockApplicationReceiveModalComponent,
    StockApplicationProcessStatusComponent,
    TrialFilterComponent,
    TeacherLevelPipe,
    StockApplicationProcessModalComponent,
    TrialCalendarComponent,
    NotificationPopupComponent,
    TrialConfirmationComponent,
    BookcourseComponent,
    BookcoursetestComponent,
    GroupcourseComponent,
    SessionsTopviewsComponent,
    //  new registration
    NewLearnerRegistrationModalComponent,
    NewRegistrationFormComponent,
    RegistrationToParentComponent,
    ParentRegistrationFormComponent,
    TutorsInfomationComponent,
    StockApplicationReplyModalComponent,
    StockApplicationDeliverModalComponent,
    StockApplicationReceiveModalComponent,
    StockApplicationProcessStatusComponent,
    TrialFilterComponent,
    TeacherLevelPipe,
    StockApplicationProcessModalComponent,
    TrialCalendarComponent,
    NotificationPopupComponent,
    TrialConfirmationComponent,
    LearnerAddModalTestComponent,
    ReasonInputComponent,
    PublishPanelComponent,
    AdminNoticeComponent,
    TodoListComponent,
    TimePickerOrgComponent,
    AdminLearnerPaymentComponent,
    AdminSendPaymentEmailComponent,
    SessionCalendarViewGroupCoursesComponent,
    TimerPickerBranchComponent,
    MessgeboardComponent,
    BoardmodelComponent,
    BoardpageComponent
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
    ChartsModule,
    MatSelectModule,
    PickerModule,
    EmojiModule,
    CKEditorModule
  ],
  providers: [
    DatePipe,
    MondayDateInWeekByDatePipe,
    NgbActiveModal
    // {
    //   provide: ErrorHandler,
    //   useClass: CustomErrorHandler,
    // },
  ],
  entryComponents: [
    AdminLearnerPaymentProductsComponent,
    AdminLearnerProfileComponent,
    TrialInfoComponent,
    AmendmentHistoryModalComponent,
    PageGroupListComponent,
    PageGroupEditComponent,
    PageGroupDeleteComponent,
    TeacherDeleteModalComponent,
    TeacherDetailModalComponent,
    TeacherUpdateModalComponent,
    TeacherCourseModalComponent,
    AdminInvoiceEditModalComponent,
    CourseDeleteModalComponent,
    CourseDetailModalComponent,
    SessionDetailEditModalComponent,
    CourseClassDetailModalComponent,
    LearnerItemComponent,
    MakeupLessonComponent,
    ModelTemplateComponent,
    LearnerDeleteModalComponent,
    LearnerDetailModalComponent,
    LearnerEditModalComponent,
    LearnerAddModalComponent,
    LearnerDeleteCourseModalComponent,
    SessionCancelModalComponent,
    SessionTrialModalComponent,
    SessionCompletedModalComponent,
    SessionRescheduleModalComponent,
    RatingModalComponent,
    AdminLearnerPeriodCourseChangeModalComponent,
    AdminLearnerProfileComponent,
    ForgotPasswordModalComponent,
    ChangePasswordModalComponent,
    RemindModalComponent,
    AdminLearnerLeaveComponent,
    AdminLearnerTimetableComponent,
    ChangePasswordModalComponent,
    LearnerRegistrationModalComponent,
    LearnerRegistrationConfirmModalComponent,
    CourseSessionListModalComponent,
    GroupSessionDetailEditModalComponent,
    StaffDeleteModalComponent,
    StaffDetailModalComponent,
    StaffEditModalComponent,
    StockApplicationUpdateModalComponent,
    StockApplicationDetailModalComponent,
    StockApplicationReplyModalComponent,
    StockApplicationDeliverModalComponent,
    StockApplicationReceiveModalComponent,
    StockApplicationProcessModalComponent,
    InventoryDetailModalComponent,
    InventoryReceiptModalComponent,
    // AddHolidaysModalComponent,
    DeleteHolidayComponent,
    AdminPaymentProductModalComponent,
    AdminPaymentConfirmModalComponent,
    // AmendmentHistoryModalComponent,
    SelectHolidaysModalComponent,
    TimePickerComponent,
    NewLearnerRegistrationModalComponent,
    TrialCalendarComponent,
    TrialConfirmationComponent,
    RegistrationToParentComponent,
    LearnerAddModalTestComponent,
    AdminLearnerPaymentComponent,
    AdminSendPaymentEmailComponent,
    BoardmodelComponent
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
