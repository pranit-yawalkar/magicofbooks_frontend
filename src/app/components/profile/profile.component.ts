import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { FileHandle } from 'src/app/models/file-handle';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('closeModal') closeModal!: ElementRef;


  editProfileForm!: FormGroup;
  profile!: Profile;
  userImage!: FileHandle;
  constructor(private userService: UserService, private imageService: ImageProcessingService, private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.editProfileForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    })
  }

  reloadComponent(path: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([path]);
  }

  get f() {
    return this.editProfileForm.controls;
  }

  formSubmit() {
    console.log(this.editProfileForm.value);
    this.profile.email = this.editProfileForm.get('email')?.value;
    this.profile.firstName = this.editProfileForm.get('firstName')?.value;
    this.profile.lastName = this.editProfileForm.get('lastName')?.value;
    if (this.userImage !== undefined && this.userImage !== null) {
      this.profile.userImage = this.userImage;
    }
    console.log(this.profile);
    const editProfileFormData = this.prepareFormData(this.profile);
    this.userService.updateProfile(editProfileFormData).subscribe(res => {
      console.log(res);
      this.editProfileForm.reset();
      this.closeModal.nativeElement.click();
      this.toastr.success('Profile Updated Successfully!', 'Success');
      this.reloadComponent('/user/profile');
    }, err => {
      console.log(err);
    })
  }

  getUserDetails() {
    this.userService.getUserDetails()
      .pipe(
        map((user: any) => this.imageService.createImage(user))
      )
      .subscribe(data => {
        console.log(data);
        this.profile = data;
      }, err => {
        console.log(err);
      })
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

  prepareFormData(profile: Profile): FormData {
    const formData = new FormData();
    formData.append(
      'user',
      new Blob([JSON.stringify(profile)], { type: 'application/json' })
    );
    formData.append(
      'imageFile',
      profile.userImage.file,
      profile.userImage.file.name
    );

    return formData;
  }

  onClickUpdateModal() {
    this.editProfileForm.patchValue({
      email: this.profile.email,
      firstName: this.profile.firstName,
      lastName: this.profile.lastName
    })
  }
}
