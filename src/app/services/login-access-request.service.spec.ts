import { TestBed } from '@angular/core/testing';

import { LoginAccessRequestService } from './login-access-request.service';

describe('LoginAccessRequestService', () => {
  let service: LoginAccessRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginAccessRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
