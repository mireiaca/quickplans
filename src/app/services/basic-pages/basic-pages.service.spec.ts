import { TestBed } from '@angular/core/testing';

import { BasicPagesService } from '../basic-pages/basic-pages.service';

describe('BasicPagesService', () => {
  let service: BasicPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
