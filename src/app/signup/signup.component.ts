import { Component, OnInit } from '@angular/core';

import { SignupService } from './signup.service';
import { UserModel } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private user: UserModel;
  constructor(private userService: SignupService,
    private router: Router) { }

  ngOnInit() {
    this.user = new UserModel();
  }

  createUser() {
    this.userService.createUser(this.user).subscribe(result => {
      this.router.navigate(['./login']);
    });
  }

  goToLogin() {
    this.router.navigate(['./login']);
  }

}
