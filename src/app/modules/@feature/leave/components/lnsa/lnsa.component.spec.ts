import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LnsaComponent } from './lnsa.component';

describe('LnsaComponent', () => {
  let component: LnsaComponent;
  let fixture: ComponentFixture<LnsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LnsaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LnsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
