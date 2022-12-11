import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  msg!: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.forAdmin();
  }

  public forAdmin() {
    this.userService.forAdmin().subscribe(res => {
      this.msg = res;
    }, err => {
      console.log(err);
    })
  }

}
