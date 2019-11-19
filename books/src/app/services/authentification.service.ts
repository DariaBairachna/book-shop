import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginViewModel, UserViewModel } from '../shared/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';
import { LocalSlorageService } from '.';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public currentUserSubject: BehaviorSubject<UserViewModel>;
  public currentUser: Observable<UserViewModel>
  public loggedUser: UserViewModel;
  constructor(
    private http: HttpClient,
    private localSlorageService: LocalSlorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<UserViewModel>(
      this.isLogin()
    )
 
  }

  public login(loginData: LoginViewModel): Observable<LoginViewModel> {
    return this.http.post<LoginViewModel>(`${environment.apiUrl}/users/authenticate`, loginData)
  }
  public logout(): void {
    this.localSlorageService.removeItem('currentUser');
  }

  public signUp(userData: UserViewModel): Observable<UserViewModel> {
    return this.http.post<UserViewModel>(`${environment.apiUrl}/users/authenticate`, userData)
  }

  public forgotPassword(email: string): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/users/authenticate`, email)
  }

  public isLogin() {
    if ((this.localSlorageService.getItem('currentUser') || this.localSlorageService.getItem('defaultLogedUser')) !== null) {

      this.loggedUser = JSON.parse(this.localSlorageService.getItem('currentUser')) || JSON.parse(this.localSlorageService.getItem('defaultLogedUser'));
 
      return this.loggedUser;
    }

    return this.loggedUser = null;

  }

}
