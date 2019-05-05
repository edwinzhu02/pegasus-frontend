import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/basic/login/login.component';
import { TestcontentComponent } from './components/testing/testcontent/testcontent.component';
import { HomepageComponent } from './components/dashboard/general/homepage/homepage.component';
import { TimePickerComponent } from './components/dashboard/dashboard-components/time-picker/time-picker.component';
import { LearnerRegistrationFormComponent } from './components/dashboard/dashboard-components/learner-registration/learner-registration-form/learner-registration-form.component';
import { DashboardRestrictGuard } from './guards/dashboard-restrict.guard';
import { AdminLearnerPaymentPanelComponent } from './components/dashboard/dashboard-components/admin-learner-payment/admin-learner-payment-panel/admin-learner-payment-panel.component';
import { AdminLearnerPaymentInvoiceComponent } from './components/dashboard/dashboard-components/admin-learner-payment/admin-learner-payment-details/admin-learner-payment-invoice/admin-learner-payment-invoice.component';
import { AdminLearnerPaymentProductsComponent } from './components/dashboard/dashboard-components/admin-learner-payment/admin-learner-payment-details/admin-learner-payment-products/admin-learner-payment-products.component';
import { AdminLearnerPaymentRegistrationComponent } from './components/dashboard/dashboard-components/admin-learner-payment/admin-learner-payment-details/admin-learner-payment-registration/admin-learner-payment-registration.component';
import { AdminLearnerPaymentOtherComponent } from './components/dashboard/dashboard-components/admin-learner-payment/admin-learner-payment-details/admin-learner-payment-other/admin-learner-payment-other.component';
import { BodyComponent } from './components/dashboard/dashboard-components/teacher/body/body.component';


const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [DashboardRestrictGuard],

    children: [
      { path: 'testcontent', component: TestcontentComponent },
      // Payments Area
      { path: 'payment/invoice', pathMatch: 'prefix', component: AdminLearnerPaymentPanelComponent,
      children: [
        { path: ':id', component: AdminLearnerPaymentInvoiceComponent },
      ]},
      { path: 'payment/products', pathMatch: 'prefix', component: AdminLearnerPaymentPanelComponent,
      children: [
        { path: ':id', component: AdminLearnerPaymentProductsComponent },
      ]},
      { path: 'payment/registration', pathMatch: 'prefix', component: AdminLearnerPaymentPanelComponent,
      children: [
        { path: ':id', component: AdminLearnerPaymentRegistrationComponent },
      ]},
<<<<<<< HEAD
      { path: 'payment/other', component: AdminLearnerPaymentOtherComponent },

      { path: 'learner', component: LearnerComponent },
      { path: 'guardian', component: GuardianComponent },
      { path: 'course', component: CourseComponent },
=======
      { path: 'payment/other', component: AdminLearnerPaymentOtherComponent },      
      { path: 'teacher', component: BodyComponent },
      { path: 'learnerRegistration', component: LearnerRegistrationFormComponent },
>>>>>>> f8e711f23203ba53fc29c6ac4d817adfc1425c18
      { path: 'timePicker', component: TimePickerComponent }
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);
