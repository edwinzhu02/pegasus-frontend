import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCalendarViewGroupCoursesComponent } from './session-calendar-view-group-courses.component';

describe('SessionCalendarViewGroupCoursesComponent', () => {
  let component: SessionCalendarViewGroupCoursesComponent;
  let fixture: ComponentFixture<SessionCalendarViewGroupCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionCalendarViewGroupCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionCalendarViewGroupCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
