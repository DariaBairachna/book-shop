import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AuthentificationService } from 'app/services';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private readonly toastr: ToastrService,
    ) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorMassage: any = "";
                if (error.status === 0) {
                    errorMassage = this.toastr.warning(error.message);
                }
                if (error.status === 401) {
                    this.toastr.warning(error.message);
                }
                if (error.status === 403) {
                    this.toastr.warning(error.message);
                }
                return throwError(errorMassage);

            })

        );
    }
}

