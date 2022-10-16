import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { retry, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';

@Injectable()
export class GlobalHttpErrorHandling implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({
        count: 3,
        delay: (_, retryCount) => timer(retryCount * 1000),
      }),
      catchError(err => {
        return throwError(() => {
          return err;
        });
      })
    );
  }
}
