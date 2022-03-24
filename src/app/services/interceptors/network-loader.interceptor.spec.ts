import { TestBed } from '@angular/core/testing';

import { NetworkLoaderInterceptor } from './network-loader.interceptor';

describe('NetworkLoaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NetworkLoaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NetworkLoaderInterceptor = TestBed.inject(NetworkLoaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
