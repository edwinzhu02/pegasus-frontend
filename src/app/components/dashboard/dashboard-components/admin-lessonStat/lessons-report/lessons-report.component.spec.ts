import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsReportComponent } from './lessons-report.component';

describe('LessonsReportComponent', () => {
  let component: LessonsReportComponent;
  let fixture: ComponentFixture<LessonsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
