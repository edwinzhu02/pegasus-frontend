/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConflictCheckService } from './conflict-check.service';

describe('Service: ConflictCheck', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConflictCheckService]
    });
  });

  it('should ...', inject([ConflictCheckService], (service: ConflictCheckService) => {
    expect(service).toBeTruthy();
  }));
});
