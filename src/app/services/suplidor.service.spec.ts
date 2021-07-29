import { TestBed } from '@angular/core/testing';

import { SuplidorService } from './suplidor.service';

describe('SuplidorService', () => {
  let service: SuplidorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuplidorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
