import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAppraisalBasicInformationComponent } from './manager-appraisal-basic-information.component';

describe('ManagerAppraisalBasicInformationComponent', () => {
  let component: ManagerAppraisalBasicInformationComponent;
  let fixture: ComponentFixture<ManagerAppraisalBasicInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerAppraisalBasicInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAppraisalBasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
