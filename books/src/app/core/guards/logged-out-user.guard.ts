import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { AuthentificationService } from 'app/services';
import { Injectable } from '@angular/core';
@Injectable()
export class LoggedOutUserGuard implements CanActivate {
    public returnUrlOld: string;
    public returnRoute: ActivatedRoute;
    constructor(
        private authenticationService: AuthentificationService,
        private router: Router,
    ) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (!this.authenticationService.isLogin()) {
            return true;
        }


        // this.returnUrlOld = this.returnRoute.snapshot.queryParams['returnUrl'] || '/' ;
        // console.log( this.returnUrlOld)
        // this.router.navigate([this.returnUrlOld], { queryParams: { returnUrl: state.url }});

        // this.router.navigateByUrl(this.returnUrlOld);
        // // || 'books-management'
        if (state.url === '/login' || state.url === '/') {
            this.router.navigate(['/books-management']);
        }
        console.log(state.url);
        this.router.navigate([state.url]);

        return false;
    }
}


