import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalAchievementsComponent } from './appraisal-achievements.component';

describe('AppraisalAchievementsComponent', () => {
  let component: AppraisalAchievementsComponent;
  let fixture: ComponentFixture<AppraisalAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraisalAchievementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
