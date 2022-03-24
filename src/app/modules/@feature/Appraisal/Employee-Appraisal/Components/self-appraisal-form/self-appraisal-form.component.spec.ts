import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAppraisalFormComponent } from './self-appraisal-form.component';

describe('SelfAppraisalFormComponent', () => {
  let component: SelfAppraisalFormComponent;
  let fixture: ComponentFixture<SelfAppraisalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfAppraisalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAppraisalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
