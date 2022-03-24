import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppraisalComponent } from './my-appraisal.component';

describe('MyAppraisalComponent', () => {
  let component: MyAppraisalComponent;
  let fixture: ComponentFixture<MyAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
