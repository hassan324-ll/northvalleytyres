import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { Tyre } from './tyre';

describe('Tyre', () => {
  let service: Tyre;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Tyre);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
