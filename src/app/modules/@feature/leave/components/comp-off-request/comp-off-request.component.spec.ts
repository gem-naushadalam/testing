import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompOffRequestComponent } from './comp-off-request.component';

describe('CompOffRequestComponent', () => {
  let component: CompOffRequestComponent;
  let fixture: ComponentFixture<CompOffRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompOffRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompOffRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
