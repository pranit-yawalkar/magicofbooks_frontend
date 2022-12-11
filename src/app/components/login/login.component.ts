import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private auth: AuthService, private router: Router, private toastrService: ToastrService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  get f() {
    return this.loginForm.controls;
  }

  reloadComponent(path: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([path]);
  }

  formSubmit(): void {
    this.userService.login(this.loginForm.value).subscribe((data: any) => {
      this.auth.setToken(data.jwtToken);
      this.auth.setRoles(data.roles);
      this.toastrService.info("User Logged In Successfully!", "");
      this.reloadComponent('');
      const role = data.user.roles[0].roleName;
      if (role === 'admin') {
        this.router.navigate(['/admin-dashboard'])
      } else {
        this.router.navigate(['user-dashboard'])
      }

    }, error => {
      console.log(error);
      this.toastrService.error("Invalid Credentials!", "");
    })
  }

}
