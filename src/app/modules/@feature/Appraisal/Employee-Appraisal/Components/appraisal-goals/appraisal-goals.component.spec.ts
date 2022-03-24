import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalGoalsComponent } from './appraisal-goals.component';

describe('AppraisalGoalsComponent', () => {
  let component: AppraisalGoalsComponent;
  let fixture: ComponentFixture<AppraisalGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraisalGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
