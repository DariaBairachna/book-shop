import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { UserViewModel, ButtonViewModel, AuthResponseModel } from 'app/shared/models';
import { ValidationService, LocalSlorageService, AuthentificationService } from 'app/services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-sing-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SingUpComponent implements OnInit, OnDestroy {
  public signUpForm: FormGroup;
  public isLogin: boolean = false;
  private destroyed: Subject<boolean> = new Subject<boolean>();
  public signUpButtonData: ButtonViewModel = new ButtonViewModel;
  public returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private localSlorageService: LocalSlorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
 
    this.signUpForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, ValidationService.validationPassword]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
    this.signUpButtonData = {
      title: "Sign up your account",
      class: "orange-btn",
      loading: false,
      disabled: true,
    };
    this.signUpForm.valueChanges.pipe(takeUntil(this.destroyed)).subscribe(data => {
      if (!this.signUpForm.invalid) {
        this.signUpButtonData.disabled = false;
      }
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/books-management';
  }

  public onSubmit() { 
    this.signUpButtonData.loading = true;
    if (this.signUpForm.invalid) {
      this.signUpButtonData.loading = false;
      return false;
    }
    this.authService.signUp(this.signUpForm.value).pipe(takeUntil(this.destroyed)).subscribe((response: AuthResponseModel) => {
      this.router.navigate([this.returnUrl]);
      this.signUpButtonData.loading = false;
      this.signUpButtonData.disabled = true;
      this.localSlorageService.setItem("token", {token: response.token, expiresIn: response.expiresIn, })
    
      
      return response;
    })
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
