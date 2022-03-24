import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppraisalCycleComponent } from './create-appraisal-cycle.component';

describe('CreateAppraisalCycleComponent', () => {
  let component: CreateAppraisalCycleComponent;
  let fixture: ComponentFixture<CreateAppraisalCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAppraisalCycleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppraisalCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
