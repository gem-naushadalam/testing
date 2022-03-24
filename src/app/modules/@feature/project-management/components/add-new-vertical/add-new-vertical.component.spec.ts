import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVerticalComponent } from './add-new-vertical.component';

describe('AddNewVerticalComponent', () => {
  let component: AddNewVerticalComponent;
  let fixture: ComponentFixture<AddNewVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewVerticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
