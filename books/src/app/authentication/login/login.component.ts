import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginData } from 'app/shared/models';
import { AuthentificationService, LocalSlorageService, ValidationService } from 'app/services';
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
    private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private localSlorageService: LocalSlorageService,
    private router: Router,
    private validationService: ValidationService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.validationService.validatePassword]),
      rememberCheckbox: new FormControl('', []),
    })
  }

  ngOnInit() {
    const savedUser = this.localSlorageService.getItem('savedUser');
    if (savedUser) {     
      let savedUserValue: LoginData = JSON.parse(savedUser);
      let {email, password} = savedUserValue; 
      this.loginForm.setValue({
        email,
        password,
        rememberCheckbox: true,
      })
    }
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      return false;

    }
    if (this.isLogin) {
      this.router.navigate(['/home']);
    }
    this.authService.login(this.loginForm.value).subscribe((response: LoginData) => {

      if (response) {
        this.isLogin = !this.isLogin;
        this.localSlorageService.setItem('currentUser', response);
        this.check(response);
      }
      console.log(this.isLogin);
    },
      (reject) => {
        let user =this.localSlorageService.getItem('defaultUser');
        let loginData: LoginData = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
        }
        if (user == JSON.stringify(loginData)) {
          this.isLogin = !this.isLogin;
          const credentialData = JSON.parse(user)
          this.localSlorageService.setItem('defaultLogedUser', credentialData);
          this.router.navigate(['/home']);
          this.check(credentialData);
          console.log(this.isLogin)
        }
      }
    );
  }

  public check(credential: LoginData) {
    if (this.loginForm.get('rememberCheckbox').value) {
      this.localSlorageService.setItem('savedUser', credential);
      this.isLogin = true;
    }
    if (!this.loginForm.get('rememberCheckbox').value) {
      this.localSlorageService.removeItem('savedUser');
    }

  }

}
