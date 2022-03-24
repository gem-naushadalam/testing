import { TestBed } from '@angular/core/testing';

import { EmployeeDirectoryService } from './employee-directory.service';

describe('EmployeeDirectoryService', () => {
  let service: EmployeeDirectoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDirectoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
