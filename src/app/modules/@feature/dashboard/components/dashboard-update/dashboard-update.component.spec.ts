import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUpdateComponent } from './dashboard-update.component';

describe('DashboardUpdateComponent', () => {
  let component: DashboardUpdateComponent;
  let fixture: ComponentFixture<DashboardUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
