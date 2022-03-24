import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBreadcrumbComponent } from './manager-breadcrumb.component';

describe('ManagerBreadcrumbComponent', () => {
  let component: ManagerBreadcrumbComponent;
  let fixture: ComponentFixture<ManagerBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerBreadcrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
