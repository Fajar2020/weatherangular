import { TestBed } from '@angular/core/testing';

import { ThreeHoursService } from './three-hours.service';

describe('ThreeHoursService', () => {
  let service: ThreeHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreeHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
