import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveCounterComponent } from './leave-counter.component';

describe('LeaveCounterComponent', () => {
  let component: LeaveCounterComponent;
  let fixture: ComponentFixture<LeaveCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
