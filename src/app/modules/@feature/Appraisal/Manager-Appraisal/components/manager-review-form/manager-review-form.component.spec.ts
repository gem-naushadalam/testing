import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerReviewFormComponent } from './manager-review-form.component';

describe('ManagerReviewFormComponent', () => {
  let component: ManagerReviewFormComponent;
  let fixture: ComponentFixture<ManagerReviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerReviewFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
