import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLearnerPaymentComponent } from './admin-learner-payment.component';

describe('AdminLearnerPaymentComponent', () => {
  let component: AdminLearnerPaymentComponent;
  let fixture: ComponentFixture<AdminLearnerPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLearnerPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLearnerPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
