import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginViewModel, ButtonViewModel, AuthResponseModel } from 'app/shared/models';
import { AuthentificationService, LocalSlorageService, ValidationService } from 'app/services';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'app/shared/components/alert/alert.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isLogin: boolean = false;
  public signInButtonData: ButtonViewModel = new ButtonViewModel();
  private destroyed: Subject<boolean> = new Subject<boolean>();
  public returnUrl: string;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private localSlorageService: LocalSlorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, ValidationService.validationPassword]),
      rememberCheckbox: new FormControl('', []),
    });

    this.signInButtonData = {
      title: "Sign-in",
      class: "orange-btn",
      loading: false,
      disabled: true,
    };
    this.loginForm.valueChanges.pipe(takeUntil(this.destroyed)).subscribe(data => {
      if (!this.loginForm.invalid) {
        this.signInButtonData.disabled = false;
      }
    });

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/books-management';
    const savedUser = this.localSlorageService.getItem('token');
    if (savedUser) {
      // let savedUserValue: string = JSON.parse(savedUser);
      // let { email, password } = savedUserValue;
      // this.loginForm.setValue({
      //   email,
      //   password,
      //   rememberCheckbox: true,
      // })
    }
  }

  public openDialog(): void {
    this.signInButtonData.loading = false;
    this.signInButtonData.disabled = true;
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { content: 'User not found ' }
    });


    dialogRef.afterClosed().pipe(takeUntil(this.destroyed)).subscribe(result => {
      this.loginForm.reset();


    });
  }

  public onSubmit() {
    this.signInButtonData.loading = true;
    if (this.loginForm.invalid) {
      this.openDialog();
      return false;
    }
    if (this.isLogin) {
      this.router.navigate(['/books-management']);
    }
    this.authService.login(this.loginForm.value).pipe(takeUntil(this.destroyed)).subscribe((response: AuthResponseModel) => {
      this.isLogin = this.authService.isLogin();
      this.localSlorageService.setItem('token', {token: response.token, expiresIn: response.expiresIn, });
      this.check(response.token);
      this.router.navigateByUrl(this.returnUrl);
    });

  }

  public check(token: string) {
    if (this.loginForm.get('rememberCheckbox').value) {
      this.localSlorageService.setItem('savedUser', token);
      this.isLogin =  this.authService.isLogin();

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
