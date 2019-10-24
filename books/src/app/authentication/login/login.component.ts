import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginData } from '../../model';
import { AuthentificationService, LocalSlorageService } from '../../service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isLogin: boolean;
  constructor(
    private fb: FormBuilder,
    private authService: AuthentificationService,
    private localSlorageService: LocalSlorageService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
    })
  }

  ngOnInit() {
  }

  public onSubmit() {

    this.authService.login(this.loginForm.value).subscribe((response: LoginData) => {
      if (response) {
        this.localSlorageService.setItem('currentUser', response);
        this.isLogin = !this.isLogin;
      }
     let user = JSON.parse(this.localSlorageService.getItem('defaultUser')); 
      if (!response && (user == this.loginForm.value)) {
        this.localSlorageService.setItem('defaultLogedUser', user);

      }
      return response;
    });
    if (this.isLogin) {
      this.router.navigate(['/home']);
    }

  }

}
