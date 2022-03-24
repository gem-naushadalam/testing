import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalBasicInformationComponent } from './appraisal-basic-information.component';

describe('AppraisalBasicInformationComponent', () => {
  let component: AppraisalBasicInformationComponent;
  let fixture: ComponentFixture<AppraisalBasicInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraisalBasicInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalBasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
