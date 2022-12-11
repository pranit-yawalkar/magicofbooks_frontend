import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileHandle } from 'src/app/models/file-handle';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  userDetails: User = new User();
  userImage: FileHandle = new FileHandle();

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/), Validators.minLength(8)]],
      cpassword: ['', [Validators.required]]
    }, {
      validator: this.confirmedValidator('password', 'cpassword')
    })
  }

  get f() {
    return this.registerForm.controls;
  }

  formSubmit() {
    console.log(this.registerForm.value);
    this.userDetails.email = this.registerForm.get('email')?.value;
    this.userDetails.firstName = this.registerForm.get('firstName')?.value;
    this.userDetails.lastName = this.registerForm.get('lastName')?.value;
    this.userDetails.password = this.registerForm.get('password')?.value;
    this.userDetails.userImage = this.userImage;
    console.log(this.userDetails);
    const registerFormData = this.prepareFormData(this.userDetails);
    this.userService.register(registerFormData).subscribe(res => {
      console.log(res);
      this.registerForm.reset();
      this.toastr.success('Registration Successful!', 'Success');
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    })
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onFileSelected(event: any) {
    console.log(event);
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.userImage = fileHandle;
    }
  }

  prepareFormData(user: User): FormData {
    const formData = new FormData();
    formData.append(
      'user',
      new Blob([JSON.stringify(user)], { type: 'application/json' })
    );
    formData.append(
      'imageFile',
      user.userImage.file,
      user.userImage.file.name
    );

    return formData;
  }

}
