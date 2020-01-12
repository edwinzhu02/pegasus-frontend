import { TestBed } from '@angular/core/testing';

import { PostEmailServiceService } from './post-email-service.service';

describe('PostEmailServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostEmailServiceService = TestBed.get(PostEmailServiceService);
    expect(service).toBeTruthy();
  });
});
