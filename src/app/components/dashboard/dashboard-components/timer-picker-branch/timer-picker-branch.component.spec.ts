import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerPickerBranchComponent } from './timer-picker-branch.component';

describe('TimerPickerBranchComponent', () => {
  let component: TimerPickerBranchComponent;
  let fixture: ComponentFixture<TimerPickerBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerPickerBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerPickerBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
