import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginViewModel, UserViewModel } from '../shared/models';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { LocalSlorageService } from '.';


@Injectable()
export class AuthentificationService {
  public curentUser: boolean;
  constructor(
    private http: HttpClient,
    private localSlorageService: LocalSlorageService
    ) { }

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
    if (this.localSlorageService.getItem('currentUser')) {
      return this.curentUser = true;
    }

    return this.curentUser = false;

  }

}
