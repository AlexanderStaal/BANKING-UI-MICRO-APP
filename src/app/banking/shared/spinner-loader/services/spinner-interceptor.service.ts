

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { SpinnerHandlerService } from './spinner-handler.service';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SpinnerInterceptorService implements HttpInterceptor {

    constructor(public spinnerHandler: SpinnerHandlerService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.spinnerHandler.show();
        return next
            .handle(request)
            .pipe(
                finalize(() => this.spinnerHandler.hide())
            );
    }
}
