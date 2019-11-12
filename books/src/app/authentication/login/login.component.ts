import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginViewModel } from 'app/shared/models';
import { AuthentificationService, LocalSlorageService, ValidationService } from 'app/services';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isLogin: boolean;
  private destroyed: Subject<boolean> = new Subject<boolean>(); 
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private localSlorageService: LocalSlorageService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, ValidationService]),
      rememberCheckbox: new FormControl('', []),
    })
  }

  ngOnInit() {
    const savedUser = this.localSlorageService.getItem('savedUser');
    if (savedUser) {     
      let savedUserValue: LoginViewModel = JSON.parse(savedUser);
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
    this.authService.login(this.loginForm.value).pipe(takeUntil(this.destroyed)).subscribe((response: LoginViewModel) => {

      if (response) {
        this.isLogin = !this.isLogin;
        this.localSlorageService.setItem('currentUser', response);
        this.check(response);
      }
      console.log(this.isLogin);
    },
      (reject) => {
        let user =this.localSlorageService.getItem('defaultUser');
        let loginData: LoginViewModel = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
        }
        if (user == JSON.stringify(loginData)) {
          this.isLogin = !this.isLogin;
          const credentialData = JSON.parse(user)
          this.localSlorageService.setItem('defaultLogedUser', credentialData);
          this.router.navigate(['/home']);
          this.check(credentialData);
        }
      }
    );
  }

  public check(credential: LoginViewModel) {
    if (this.loginForm.get('rememberCheckbox').value) {
      this.localSlorageService.setItem('savedUser', credential);
      this.isLogin = true;
    }
    if (!this.loginForm.get('rememberCheckbox').value) {
      this.localSlorageService.removeItem('savedUser');
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete(); 
  }

}
