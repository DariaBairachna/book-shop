import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginViewModel, UserViewModel, AuthResponseModel } from '../shared/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';
import { LocalSlorageService } from '.';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public currentUserSubject: BehaviorSubject<boolean>;
  public currentUser: Observable<boolean>
  public loggedUser: UserViewModel;
  constructor(
    private http: HttpClient,
    private localSlorageService: LocalSlorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<boolean>(
      this.isLogin()
    );
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public login(loginData: LoginViewModel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${environment.apiUrl}/auth/login`, loginData)
  }

  public logout(): void {
    this.currentUserSubject = new BehaviorSubject<boolean>(
      this.isLogin()
    );
    this.localSlorageService.removeItem('defaultLogedUser');
  }

  public signUp(userData: UserViewModel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${environment.apiUrl}/auth/register`, userData)
  }

  public forgotPassword(email: string): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/users/authenticate`, email)
  }

  public resetPassword(id: string, password: string): Observable<string> {
    return this.http.put<string>(`${environment.apiUrl}/users/${id}`, password)
  }

  public get user(): boolean {
    return this.currentUserSubject.getValue();
  }

  public set user(data: boolean) {
    this.currentUserSubject.next(data);

  }


  public isLogin() {
    const currentUser = this.localSlorageService.getItem('token');
    if (!currentUser) {
      return false;
    }
    return true;

  }

}
