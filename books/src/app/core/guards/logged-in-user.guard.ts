import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthentificationService } from 'app/services';
import { Injectable } from '@angular/core';
@Injectable()
export class LoggedInUserGuard implements CanActivate {

    constructor(private authenticationService: AuthentificationService,
        private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.authenticationService.isLogin()) {

            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}