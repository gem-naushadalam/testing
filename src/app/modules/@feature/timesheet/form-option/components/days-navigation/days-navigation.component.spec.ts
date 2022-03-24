import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysNavigationComponent } from './days-navigation.component';

describe('DaysNavigationComponent', () => {
  let component: DaysNavigationComponent;
  let fixture: ComponentFixture<DaysNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
