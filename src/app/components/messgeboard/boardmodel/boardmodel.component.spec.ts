import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardmodelComponent } from './boardmodel.component';

describe('BoardmodelComponent', () => {
  let component: BoardmodelComponent;
  let fixture: ComponentFixture<BoardmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
