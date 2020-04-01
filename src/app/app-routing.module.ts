import { AdminNoticeComponent } from './components/dashboard/dashboard-components/admin-notice/admin-notice.component';
import { Routes, RouterModule } from "@angular/router";
import { DashboardRestrictGuard } from "./guards/dashboard-restrict.guard";
import { UserAuthGuard } from "./guards/user-auth.guard";
import { UserAuthOtherGuard } from "./guards/user-auth-other.guard";

import { LoginComponent } from "./components/basic/login/login.component";
import { DashboardPanelComponent } from "./components/dashboard/general/dashboard-panel/dashboard-panel.component";
import { LearnerRegistrationModalComponent } from "./components/dashboard/dashboard-components/learner-registration/learner-registration-modal/learner-registration-modal.component";
import { LearnerRegistrationFormComponent } from "./components/dashboard/dashboard-components/learner-registration/learner-registration-form/learner-registration-form.component";
import { AdminLearnerPaymentPanelComponent } from "./components/dashboard/dashboard-components/admin-payment/admin-learner-payment-panel/admin-learner-payment-panel.component";
import { AdminLearnerPaymentInvoiceComponent } from "./components/dashboard/dashboard-components/admin-payment/admin-learner-payment-invoice/admin-learner-payment-invoice.component";
import { AdminLearnerPaymentProductsComponent } from "./components/dashboard/dashboard-components/admin-payment/admin-learner-payment-products/admin-learner-payment-products.component";
import { AdminLearnerPaymentRegistrationComponent } from "./components/dashboard/dashboard-components/admin-payment/admin-learner-payment-registration/admin-learner-payment-registration.component";
import { AdminLearnerPaymentOtherComponent } from "./components/dashboard/dashboard-components/admin-payment/admin-learner-payment-other/admin-learner-payment-other.component";
import { AdminLearnerPaymentSuccessComponent } from "./components/dashboard/dashboard-components/admin-payment/admin-learner-payment-success/admin-learner-payment-success.component";
import { CourseClassListComponent } from "./components/dashboard/dashboard-components/courses/course-class-list/course-class-list.component";
import { CoursesListComponent } from "./components/dashboard/dashboard-components/courses/courses-list/courses-list.component";
import { SessionsListViewComponent } from "./components/dashboard/dashboard-components/sessions/sessions-views/sessions-list-view/sessions-list-view.component";
import { SessionsPanelComponent } from "./components/dashboard/dashboard-components/sessions/sessions-panel/sessions-panel.component";
import { CoursesPanelComponent } from "./components/dashboard/dashboard-components/courses/courses-panel/courses-panel.component";
import { AdminLearnerPanelComponent } from "./components/dashboard/dashboard-components/admin-learner/admin-learner-panel/admin-learner-panel.component";
import { AdminLearnerListComponent } from "./components/dashboard/dashboard-components/admin-learner/admin-learner-list/admin-learner-list.component";
import { AdminLearnerPaymentComponent } from "./components/dashboard/dashboard-components/admin-learner/admin-learner-payment/admin-learner-payment.component";

import { InventoryPanelComponent } from "./components/dashboard/dashboard-components/inventory/inventory-panel/inventory-panel.component";
import { InventoryListComponent } from "./components/dashboard/dashboard-components/inventory/inventory-list/inventory-list.component";
import { PayrollPanelComponent } from "./components/dashboard/dashboard-components/admin-payroll/payroll-panel/payroll-panel.component";
import { PayrollListComponent } from "./components/dashboard/dashboard-components/admin-payroll/payroll-list/payroll-list.component";
import { AdminInvoiceListComponent } from "./components/dashboard/dashboard-components/admin-transactions/admin-invoice-list/admin-invoice-list.component";
import { TransactionsPanelComponent } from "./components/dashboard/dashboard-components/admin-transactions/transactions-panel/transactions-panel.component";
import { AdminPaymentListComponent } from "./components/dashboard/dashboard-components/admin-transactions/admin-payment/admin-payment-list/admin-payment-list.component";
import { AdminSalesListComponent } from "./components/dashboard/dashboard-components/admin-transactions/admin-sales-list/admin-sales-list.component";
import { SessionsCalendarViewAdminComponent } from "./components/dashboard/dashboard-components/sessions/sessions-views/sessions-calendar-view-admin/sessions-calendar-view-admin.component";
import { SessionsCalendarViewTutorComponent } from "./components/dashboard/dashboard-components/sessions/sessions-views/sessions-calendar-view-tutor/sessions-calendar-view-tutor.component";
import { SessionCalendarViewGroupCoursesComponent } from './components/dashboard/dashboard-components/sessions/sessions-views/session-calendar-view-group-courses/session-calendar-view-group-courses.component';
import { TeacherPanelComponent } from "./components/dashboard/dashboard-components/teachers/teacher-panel/teacher-panel.component";
import { TeacherInfoComponent } from "./components/dashboard/dashboard-components/teachers/teacher-info/teacher-info.component";
import { TestoneComponent } from "./components/testcomponent/testone/testone.component";

import { DashboardHomeComponent } from "./components/dashboard/dashboard-components/dashboard-home/dashboard-home.component";
import { RemindListComponent } from "./components/dashboard/dashboard-components/remind/remind-list/remind-list.component";
import { RemindPanelComponent } from "./components/dashboard/dashboard-components/remind/remind-panel/remind-panel.component";
import { StaffListComponent } from "./components/dashboard/dashboard-components/admin-staff/Staff-list/Staff-list.component";
import { LearnerCreditPanelComponent } from "./components/dashboard/dashboard-components/learner-credit/learner-credit-panel/learner-credit-panel.component";
import { LearnerCreditDetailsComponent } from "./components/dashboard/dashboard-components/learner-credit/learner-credit-details/learner-credit-details.component";
import { HolidayCalendarComponent } from "./components/dashboard/dashboard-components/admin-holidays/holiday-calendar/holiday-calendar.component";
import { CoporateOrderApplicationComponent } from "./components/dashboard/dashboard-components/admin-inventory-application-dispatch/coporate-order-application/coporate-order-application.component";
import { PageGroupDetailsComponent } from "./components/dashboard/dashboard-components/admin-pageGroup/pageGroup-details/pageGroup-details.component";
import { ConflictCheckComponent } from "./components/dashboard/dashboard-components/conflict-check/conflict-check/conflict-check.component";
import { StockApplicationListComponent } from "./components/dashboard/dashboard-components/inventory/inventory-stock-application/stock-application-list/stock-application-list.component";
import { AdminLearnerTimetableComponent } from "./components/dashboard/dashboard-components/admin-learner/admin-learner-timetable/admin-learner-timetable.component";
import { TutorsInfomationComponent } from "./components/dashboard/dashboard-components/tutors/tutors-infomation/tutors-infomation.component";
import { PayListComponent } from "./components/dashboard/dashboard-components/admin-staff/pay-list/pay-list.component";
import { TrialInfoComponent } from "./components/dashboard/dashboard-components/trial-course/trial-info/trial-info.component";
import { PublishPanelComponent } from "./components/dashboard/dashboard-components/admin-publish/publish-panel/publish-panel.component";
import { TodoListComponent } from './components/dashboard/dashboard-components/admin-notice/todo-list/todo-list.component';
import { SessionsTopviewsComponent } from './components/dashboard/dashboard-components/sessions/sessions-topviews/sessions-topviews.component';
import {BoardpageComponent} from './components/messgeboard/boardpage/boardpage.component'
import { MessageboxComponent } from './components/messagebox/messagebox.component';
//canActivate: [DashboardRestrictGuard],
const routes: Routes = [
  {
    path: "",
    component: DashboardPanelComponent,
    canActivate: [DashboardRestrictGuard],
    children: [
      {
        path: "home",
        component: DashboardHomeComponent,
        canActivate: [UserAuthOtherGuard]
      },
      // Testing path
      { path: "testone", component: TestoneComponent },
      // Payment Area
      {
        path: "payment/invoice",
        pathMatch: "prefix",
        component: AdminLearnerPaymentPanelComponent,
        canActivate: [UserAuthGuard],
        children: [
          { path: ":id", component: AdminLearnerPaymentInvoiceComponent },
          { path: "success", component: AdminLearnerPaymentSuccessComponent }
        ]
      },
      {
        path: "tu/list",
        component: TutorsInfomationComponent
      },
      {
        path: "payment/product",
        pathMatch: "prefix",
        component: AdminLearnerPaymentPanelComponent,
        canActivate: [UserAuthGuard],
        children: [
          { path: "success", component: AdminLearnerPaymentSuccessComponent },
          { path: ":id", component: AdminLearnerPaymentProductsComponent }
        ]
      },
      {
        path: "payment/registration",
        pathMatch: "prefix",
        component: AdminLearnerPaymentPanelComponent,
        canActivate: [UserAuthGuard],
        children: [
          { path: "success", component: AdminLearnerPaymentSuccessComponent },
          { path: ":id", component: AdminLearnerPaymentRegistrationComponent }
        ]
      },
      {
        path: "payment/other",
        pathMatch: "prefix",
        component: AdminLearnerPaymentOtherComponent,
        canActivate: [UserAuthGuard],
        children: [
          { path: "success", component: AdminLearnerPaymentSuccessComponent }
        ]
      },
      { path: "trial", component: TrialInfoComponent },
      // Transaction Area
      {
        path: "transaction",
        component: TransactionsPanelComponent,
        children: [
          {
            path: "invoices",
            component: AdminInvoiceListComponent,
            canActivate: [UserAuthGuard]
          },
          {
            path: "success",
            component: AdminLearnerPaymentSuccessComponent,
            canActivate: [UserAuthGuard]
          },
          {
            path: "payments",
            component: AdminPaymentListComponent,
            canActivate: [UserAuthGuard]
          },
          {
            path: "sales",
            component: AdminSalesListComponent,
            canActivate: [UserAuthGuard]
          }
        ]
      },
      // Teacher Area
      {
        path: "tutors",
        component: TeacherPanelComponent,
        children: [
          {
            path: "list",
            component: TeacherInfoComponent,
            canActivate: [UserAuthGuard]
          }
        ]
      },
      // Sessions Area
      {
        path: "sessions",
        component: SessionsPanelComponent,
        children: [
          {
            path: "list",
            component: SessionsListViewComponent,
            canActivate: [UserAuthGuard]
          },
          {
            path: "calendar/admin",
            component: SessionsCalendarViewAdminComponent,
            canActivate: [UserAuthGuard]
          },
          {
            path: "calendar/admin/:searchdate",
            component: SessionsCalendarViewAdminComponent,
            canActivate: [UserAuthGuard]
          },
          {
            path: "calendar/tutor",
            component: SessionsCalendarViewTutorComponent,
            canActivate: [UserAuthGuard]
          },
          {
            path: "calendar/topview",
            component: SessionsTopviewsComponent,
            canActivate: [UserAuthGuard]
          },
          {
            path: "calendar/groupcourses",
            component: SessionCalendarViewGroupCoursesComponent,
            canActivate: [UserAuthGuard]
          },         
          {
            path: "calendar/groupcourses/:onetoone",
            component: SessionCalendarViewGroupCoursesComponent,
            canActivate: [UserAuthGuard]
          },
                                   
        ]
      },
      // Courses Area
      {
        path: "courses",
        component: CoursesPanelComponent,
        children: [
          {
            path: "list",
            component: CoursesListComponent,
            canActivate: [UserAuthGuard]
          },
          { path: "class/list", component: CourseClassListComponent }
        ]
      },
      // Learner Area
      {
        path: "learner",
        component: AdminLearnerPanelComponent,
        children: [
          {
            path: "list",
            component: AdminLearnerListComponent,
            canActivate: [UserAuthGuard],
            children: [
              {
                path: "success",
                component: AdminLearnerPaymentSuccessComponent
              }
            ]
          },
          {
            path: "registration/edit",
            component: LearnerRegistrationModalComponent
          },
          {
            path: "registration",
            component: LearnerRegistrationFormComponent,
            canActivate: [UserAuthGuard]
          },
          
          { path: "trial", component: TrialInfoComponent },
          {
            path: "credit",
            component: LearnerCreditPanelComponent,
            canActivate: [UserAuthGuard],
            children: [
              {
                path: ":id",
                component: LearnerCreditDetailsComponent
              }
            ]
          },
          {
            path: "arrange/:learnerId/:courseId",
            component: TrialInfoComponent
          },
          { path: "success", component: AdminLearnerPaymentSuccessComponent }
        ]
      },
      // Inventory Area
      {
        path: "inventory",
        component: InventoryPanelComponent,
        children: [
          { path: "list", component: InventoryListComponent },
          {
            path: "stock-application",
            component: StockApplicationListComponent
          }
        ]
      },
      // Payroll Area
      {
        path: "payroll",
        component: PayrollPanelComponent,
        children: [{ path: "list", component: PayrollListComponent }]
      },
      // Remind Area
      {
        path: "remind",
        component: RemindPanelComponent,
        children: [{ path: "list", component: RemindListComponent }]
      },
      //Staff Area
      { path: "staff/list", component: StaffListComponent },
      { path: "paylist", component: PayListComponent },

      //pagegroup area
      { path: "pageGroup", component: PageGroupDetailsComponent },

      // Below to be rearranged
      { path: "holidays", component: HolidayCalendarComponent },
      { path: "notice", component: AdminNoticeComponent },
      { path: "todoList", component: TodoListComponent },
      {
        path: "corporate-order-application",
        component: CoporateOrderApplicationComponent
      },
      { path: "conflict-Check", component: ConflictCheckComponent },
      { path: "publish", component: PublishPanelComponent },
      {
        path: "emailSender",
        component: AdminLearnerPaymentComponent,
        canActivate: [UserAuthGuard]
      },
      {
        path: "MessageBox",
        component: MessageboxComponent,
        canActivate: [UserAuthGuard]
      }, 
    ]
  },
  { path: "Messgeboard/:role/:lessonId/:id", component: BoardpageComponent },
  
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "home" }
];

export const routing = RouterModule.forRoot(routes);
