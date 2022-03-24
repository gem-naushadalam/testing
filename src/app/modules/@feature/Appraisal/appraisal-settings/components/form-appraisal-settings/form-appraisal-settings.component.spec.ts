import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAppraisalSettingsComponent } from './form-appraisal-settings.component';

describe('FormAppraisalSettingsComponent', () => {
  let component: FormAppraisalSettingsComponent;
  let fixture: ComponentFixture<FormAppraisalSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAppraisalSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAppraisalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
