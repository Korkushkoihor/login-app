import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegexService} from '../services/regex.service';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    RegexService
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  errorMsg: string = '';
  isError: boolean = false;
  disabled: boolean = false;
  subscriptionsList: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private regexService: RegexService,
    private loginService: LoginService,
    private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.regexService.emailPattern)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(this.regexService.passwordPattern)])]
    });

    this.subscriptionsList.push(
      // hide any errors on inputs changes
      this.loginForm.valueChanges.subscribe(() => {
        this.isError = false;
        this.errorMsg = '';
      })
    );
  }

// handler on submit form
  submitLogin() {
    if (this.loginForm.valid) {
      // do something only if form valid
      this.disabled = true;
      // login with credentials from form via fireAuth
      this.loginService.logIn({
        email: this.loginForm.value['email'],
        password: this.loginForm.value['password']
      })
        .then(() => {
          debugger;
          // after login - call setAccessToken function
          this.setAccessToken();
        })
        .catch(err => {
          debugger;
          // if something went wrong with login - reset form and show error
          this.loginForm.reset();
          this.errorMsg = err.message;
          this.isError = true;
          this.disabled = false;
        });
    }
  }

  // function to subscribe to the moment when token is setted and we can load page with permission
  public setAccessToken() {
    this.disabled = false;
    this.subscriptionsList.push(
      // subscribe to the moment when token is setted
      this.loginService.setAccessToken()
        .subscribe(res => {
          // when setted navigate to the root (guard will navigate to attributes or another page - it depends on user's permissions)
          window.location.href = '/assets/mental-ukr.html';
        }));
  }

}
