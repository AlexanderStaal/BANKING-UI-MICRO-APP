import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandlingInterceptor } from './global-error-handling.interceptor';

describe('GlobalErrorHandlingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GlobalErrorHandlingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GlobalErrorHandlingInterceptor = TestBed.inject(GlobalErrorHandlingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
