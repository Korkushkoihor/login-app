import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from './services/login.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mental-arithmetic';
  subscriptions: Subscription[] = [];

  constructor(private loginService: LoginService) {

  }

  ngOnInit() {
    this.subscriptions.push(this.loginService.getUserInfo()
      .subscribe(user => {
        if (user && window.location.href.indexOf('/tutorial') <= 0) {
          window.location.href = '/assets/mental-ukr.html';
        }
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(elem => {
      if (elem) {
        elem.unsubscribe();
      }
    });
  }
}
