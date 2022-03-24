import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPolicyComponent } from './main-policy.component';

describe('MainPolicyComponent', () => {
  let component: MainPolicyComponent;
  let fixture: ComponentFixture<MainPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
