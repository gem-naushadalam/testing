import { TestBed } from '@angular/core/testing';

import { ToggleBtnService } from './toggle-btn.service';

describe('ToggleBtnService', () => {
  let service: ToggleBtnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleBtnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
