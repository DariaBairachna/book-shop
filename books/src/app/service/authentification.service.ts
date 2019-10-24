import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData, User } from '../model';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';
import { LocalSlorageService } from '.';


@Injectable({
  providedIn: 'root'
})


export class AuthentificationService {

  constructor(
    private http: HttpClient,
    private localSlorageService: LocalSlorageService) { }

  public login(loginData: LoginData): Observable<object> {
    return this.http.post(`${environment.apiUrl}/users/authenticate`, loginData)
  }
  public logout() {
    this.localSlorageService.removeItem('currentUser');
  
  }

  public signUp(userData: User) {
    return this.http.post(`${environment.apiUrl}/users/authenticate`, userData)
  }

  public isLogin() {
    if (this.localSlorageService.getItem('currentUser')) {
      return true;
    }

    return false;

  }

}
