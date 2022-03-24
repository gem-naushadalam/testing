import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeaveComponent } from './team-leave.component';

describe('TeamLeaveComponent', () => {
  let component: TeamLeaveComponent;
  let fixture: ComponentFixture<TeamLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
