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
    );

    this.currentUser = this.currentUserSubject.asObservable();
 
  }

  public login(loginData: LoginViewModel): Observable<LoginViewModel> {
    return this.http.post<LoginViewModel>(`${environment.apiUrl}/auth/login`, loginData)
  }
  public logout(): void {
    this.currentUserSubject = new BehaviorSubject<UserViewModel>(
      this.isLogin()
    );
    this.localSlorageService.removeItem('defaultLogedUser');

  }

  public signUp(userData: UserViewModel): Observable<UserViewModel> {
    return this.http.post<UserViewModel>(`${environment.apiUrl}/auth/register`, userData)
  }

  public forgotPassword(email: string): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/users/authenticate`, email)
  }
  public resetPassword(id:string, password: string): Observable<string>{
return this.http.put<string>(`${environment.apiUrl}/users/${id}`, password)
  }

  public get user(): UserViewModel{
    return this.currentUserSubject.getValue();
  }

  public set user(data: UserViewModel){
    this.currentUserSubject.next(data);

  }


  public isLogin() {
    const currentUser = this.localSlorageService.getItem('currentUser');
    const defaultUser =  this.localSlorageService.getItem('defaultUser');
    const defaultLoggetUser =  this.localSlorageService.getItem('defaultLoggedUser');
    if(!currentUser && !defaultLoggetUser){
      return false;
    }
    return JSON.parse(defaultUser);

  }

}
