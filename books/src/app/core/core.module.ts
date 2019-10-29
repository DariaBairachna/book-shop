import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    exports: [
        CommonModule,
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
            multi: true,
    }]
})
export class CoreModule {

}