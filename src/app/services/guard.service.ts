import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private registrationService: RegistrationService,
    private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let islogged;
    /*this.registrationService.isLoggedIn.subscribe(
      response => {
        islogged = response
      }
    );*/

    /*console.log("isLoggedIn --> " + islogged);
    if (islogged) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }*/

    if (islogged = localStorage.getItem("activeUserId") != null) {
      console.log("isLoggedIn --> " + islogged);
      this.registrationService.setIsLoggedIn(true);
      return true;
    } else {
      this.router.navigate(['']);
      this.registrationService.setIsLoggedIn(false);
      return false;
    }
  }
}
