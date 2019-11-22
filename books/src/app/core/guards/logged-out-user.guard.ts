import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, NavigationStart, NavigationEnd } from "@angular/router";
import { Observable } from "rxjs";
import { AuthentificationService } from 'app/services';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
@Injectable()
export class LoggedOutUserGuard implements CanActivate {
    public returnUrl: string;
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
        this.router.navigate(['books-management']);
        return false;
    }
}


