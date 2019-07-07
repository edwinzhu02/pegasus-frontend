import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentProductModalComponent } from './admin-payment-product-modal.component';

describe('AdminPaymentProductModalComponent', () => {
  let component: AdminPaymentProductModalComponent;
  let fixture: ComponentFixture<AdminPaymentProductModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaymentProductModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
