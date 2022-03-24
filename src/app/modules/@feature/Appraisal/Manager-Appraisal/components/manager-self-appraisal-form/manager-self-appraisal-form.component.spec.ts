import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSelfAppraisalFormComponent } from './manager-self-appraisal-form.component';

describe('ManagerSelfAppraisalFormComponent', () => {
  let component: ManagerSelfAppraisalFormComponent;
  let fixture: ComponentFixture<ManagerSelfAppraisalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerSelfAppraisalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSelfAppraisalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
