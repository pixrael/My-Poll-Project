import { TestBed } from '@angular/core/testing';

import { LoginStatusValidatorService } from './login-status-validator.service';

describe('LoginStatusValidatorService', () => {
  let service: LoginStatusValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginStatusValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
