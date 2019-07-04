import { TestBed } from '@angular/core/testing';

import { ScrollLockService } from './scroll-lock.service';

describe('ScrollLockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrollLockService = TestBed.get(ScrollLockService);
    expect(service).toBeTruthy();
  });
});
