import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSendPaymentEmailComponent } from './admin-send-payment-email.component';

describe('AdminSendPaymentEmailComponent', () => {
  let component: AdminSendPaymentEmailComponent;
  let fixture: ComponentFixture<AdminSendPaymentEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSendPaymentEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSendPaymentEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
