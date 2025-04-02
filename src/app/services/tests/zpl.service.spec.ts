import { TestBed } from '@angular/core/testing';

import { ZplService } from '../zpl.service';

describe('ZplService', () => {
  let service: ZplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
