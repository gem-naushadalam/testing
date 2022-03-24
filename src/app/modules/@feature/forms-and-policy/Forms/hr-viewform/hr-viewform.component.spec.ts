import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrViewformComponent } from './hr-viewform.component';

describe('HrViewformComponent', () => {
  let component: HrViewformComponent;
  let fixture: ComponentFixture<HrViewformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrViewformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrViewformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
