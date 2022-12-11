import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router,
    private userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.auth.getToken() !== null) {
      const roles = route.data['roles'] as Array<string>;
      if (roles) {
        const match = this.userService.rolesMatch(roles);
        if (match) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      }
    }
    this.router.navigate(['/login']);
    return false;
  }


}
