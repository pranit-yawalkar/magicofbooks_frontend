import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  msg!: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.forUser();
  }

  public forUser() {
    this.userService.forUser().subscribe(res => {
      this.msg = res;
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

}
