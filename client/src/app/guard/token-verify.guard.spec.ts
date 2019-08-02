import { TestBed, async, inject } from '@angular/core/testing';

import { TokenVerifyGuard } from './token-verify.guard';

describe('TokenVerifyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenVerifyGuard]
    });
  });

  it('should ...', inject([TokenVerifyGuard], (guard: TokenVerifyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
