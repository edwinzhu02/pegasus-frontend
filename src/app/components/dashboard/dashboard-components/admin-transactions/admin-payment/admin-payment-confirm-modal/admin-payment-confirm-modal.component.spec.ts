import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentConfirmModalComponent } from './admin-payment-confirm-modal.component';

describe('AdminPaymentConfirmModalComponent', () => {
  let component: AdminPaymentConfirmModalComponent;
  let fixture: ComponentFixture<AdminPaymentConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaymentConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
