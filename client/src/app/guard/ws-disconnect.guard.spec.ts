import { TestBed, async, inject } from '@angular/core/testing';

import { WsDisconnectGuard } from './ws-disconnect.guard';

describe('WsDisconnectGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsDisconnectGuard]
    });
  });

  it('should ...', inject([WsDisconnectGuard], (guard: WsDisconnectGuard) => {
    expect(guard).toBeTruthy();
  }));
});
