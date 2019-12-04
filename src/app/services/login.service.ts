import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginModel} from '../models/login.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afAuth: AngularFireAuth) {
  }

  public logIn(loginModel: LoginModel): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(loginModel.email, loginModel.password);
  }

  // function to set access token in local storage and in authenticationStore
  public setAccessToken() {
    return this.afAuth.idToken
      .pipe(map(token => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('isUserLoggedIn', (!!token).toString());
        return token;
      }));
  }

  // function returns data of user is logged in
  public getUserInfo(): Observable<User | null> {
    return this.afAuth.user;
  }
}
