import { TestBed } from '@angular/core/testing';

import { AttendanceResolverService } from './attendance-resolver.service';

describe('AttendanceResolverService', () => {
  let service: AttendanceResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
