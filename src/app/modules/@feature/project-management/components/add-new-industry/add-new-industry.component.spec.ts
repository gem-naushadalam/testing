import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewIndustryComponent } from './add-new-industry.component';

describe('AddNewIndustryComponent', () => {
  let component: AddNewIndustryComponent;
  let fixture: ComponentFixture<AddNewIndustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewIndustryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
