import { TestBed } from '@angular/core/testing';

import { LoadImagesService } from './load-images.service';

describe('LoadImagesService', () => {
  let service: LoadImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
