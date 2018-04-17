import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppService } from './app.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private appService: AppService, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
    this.appService.userObj = JSON.parse(localStorage.getItem('user')
    );
  }

  onLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
