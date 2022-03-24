import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAppraisalAchievementsComponent } from './manager-appraisal-achievements.component';

describe('ManagerAppraisalAchievementsComponent', () => {
  let component: ManagerAppraisalAchievementsComponent;
  let fixture: ComponentFixture<ManagerAppraisalAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerAppraisalAchievementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAppraisalAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
