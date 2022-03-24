import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutDutyRequestComponent } from './out-duty-request.component';

describe('OutDutyRequestComponent', () => {
  let component: OutDutyRequestComponent;
  let fixture: ComponentFixture<OutDutyRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutDutyRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutDutyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
