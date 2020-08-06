import { Injectable } from '@angular/core';

import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { MessageService } from 'primeng/api';

import { AccuWheatherError } from '../models/accu-wheather-error.model';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private messageService: MessageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((err: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (err.error instanceof AccuWheatherError) {
                        errorMessage = `Error Code: ${err.error.Code}\nMessage: ${err.error.Message}`;
                    } else {
                        errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
                    }

                    this.messageService.add({
                        severity: 'error', summary: 'Error', detail: errorMessage
                    });

                    return throwError(errorMessage);
                })
            )
    }
}