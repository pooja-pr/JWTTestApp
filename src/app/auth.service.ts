import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from './app.service';

@Injectable()
export class AuthGaurd implements CanActivate {
    private user = this.appService.userObj;
    constructor(
        public router: Router,
        private appService: AppService
    ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (!this.user) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
