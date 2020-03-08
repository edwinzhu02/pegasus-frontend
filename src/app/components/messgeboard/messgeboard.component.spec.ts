import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessgeboardComponent } from './messgeboard.component';

describe('MessgeboardComponent', () => {
  let component: MessgeboardComponent;
  let fixture: ComponentFixture<MessgeboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessgeboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessgeboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
