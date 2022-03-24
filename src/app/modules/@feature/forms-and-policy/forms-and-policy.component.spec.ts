import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsAndPolicyComponent } from './forms-and-policy.component';

describe('FormsAndPolicyComponent', () => {
  let component: FormsAndPolicyComponent;
  let fixture: ComponentFixture<FormsAndPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsAndPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsAndPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
