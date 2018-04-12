import { Component, OnInit } from '@angular/core';

import { SignupService } from './signup.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private user: UserModel;
  constructor(private userService: SignupService) { }

  ngOnInit() {
    this.user = new UserModel();
  }

  createUser() {
    this.userService.createUser(this.user);
  }

}
