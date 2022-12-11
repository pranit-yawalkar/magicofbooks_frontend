import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { async, map, Observable, shareReplay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {
  BreakpointObserver,
  Breakpoints
} from '@angular/cdk/layout';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  burger!: any
  nav!: any;
  navlinks!: any;

  showMenu: boolean = false;
  showMenuIcon: boolean = false;
  roles!: any;
  isAdmin!: boolean;
  isUser!: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private router: Router
    , private userService: UserService, private shared: SharedService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.roles = localStorage.getItem('roles');
    this.isAdmin = this.roles.includes('admin');
    this.isUser = this.roles.includes('user');
    console.log(this.isAdmin + " " + this.isUser);
  }

  reloadComponent(path: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([path]);
  }

  public toggleMenu() {
    this.isHandset$.subscribe(data => {
      if (data === true) {
        this.showMenu = !this.showMenu;
        this.showMenuIcon = !this.showMenuIcon;
        this.shared.sendData(this.showMenu);
      }
    });
  }

  public isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  public logout() {
    this.auth.clear();
    this.toastrService.success("User logged out succesfully!");
    this.router.navigate(['/login']);
    this.toggleMenu();
  }

  public getRole() {
    this.auth.getRoles();
  }

  public rolesMatch(role: string) {
    return this.userService.roleMatch(role);
  }

}
