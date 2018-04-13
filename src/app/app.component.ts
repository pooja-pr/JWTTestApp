import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private appService: AppService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.appService.userObj = JSON.parse(localStorage.getItem('user'));
  }
}
