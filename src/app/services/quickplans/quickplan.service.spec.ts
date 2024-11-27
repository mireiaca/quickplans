import { TestBed } from '@angular/core/testing';

import { QuickplanService } from './quickplan.service';

describe('QuickplanService', () => {
  let service: QuickplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
