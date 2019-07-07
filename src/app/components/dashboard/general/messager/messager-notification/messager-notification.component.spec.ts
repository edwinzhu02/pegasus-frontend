import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagerNotificationComponent } from './messager-notification.component';

describe('MessagerNotificationComponent', () => {
  let component: MessagerNotificationComponent;
  let fixture: ComponentFixture<MessagerNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagerNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagerNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
