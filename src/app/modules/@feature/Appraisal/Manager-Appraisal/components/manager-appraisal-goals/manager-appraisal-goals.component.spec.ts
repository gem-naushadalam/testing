import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAppraisalGoalsComponent } from './manager-appraisal-goals.component';

describe('ManagerAppraisalGoalsComponent', () => {
  let component: ManagerAppraisalGoalsComponent;
  let fixture: ComponentFixture<ManagerAppraisalGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerAppraisalGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAppraisalGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
