import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AuthentificationService } from 'app/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authentificationService: AuthentificationService) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorMassage: string = "";
                console.log(error);
                if (error.status === 404) {
                    console.log(error);
                }
                return throwError(errorMassage)

            }

            )

        );
    }
}