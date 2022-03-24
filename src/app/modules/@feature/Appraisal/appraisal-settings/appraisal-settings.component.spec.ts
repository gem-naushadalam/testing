import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalSettingsComponent } from './appraisal-settings.component';

describe('AppraisalSettingsComponent', () => {
  let component: AppraisalSettingsComponent;
  let fixture: ComponentFixture<AppraisalSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraisalSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
