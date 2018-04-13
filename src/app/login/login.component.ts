import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import { UsersModel } from './users.model';
import { LoginService } from './login.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: UsersModel;
  constructor(private http: HttpClient,
    private loginService: LoginService,
    private toastr: ToastsManager,
    private router: Router,
    private appService: AppService) { }

  ngOnInit() {
    this.user = new UsersModel();
  }

  login() {
    this.loginService.login(this.user).subscribe(userObj => {
      console.log(userObj);
      if (!userObj.error) {
        this.user = userObj;
        this.appService.userObj = this.user;
        this.router.navigate(['./todo']);
      } else {
        this.toastr.error('Login failed');
      }
    });
  }

}
