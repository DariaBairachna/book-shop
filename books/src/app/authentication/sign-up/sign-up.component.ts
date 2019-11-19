import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { UserViewModel, ButtonViewModel } from 'app/shared/models';
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
  private destroyed: Subject<boolean> = new Subject<boolean>();
  public signUpButtonData: ButtonViewModel = new ButtonViewModel;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private localSlorageService: LocalSlorageService,
    private router: Router,
  ) {
    this.signUpForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, ValidationService]),
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
  }

  public onSubmit() { 
    this.signUpButtonData.loading = true;
    if (this.signUpForm.invalid) {
      this.signUpButtonData.loading = false;
      return false;
 
    }

    this.authService.signUp(this.signUpForm.value).pipe(takeUntil(this.destroyed)).subscribe((response: UserViewModel) => {
      this.router.navigate(['/login']);
      this.localSlorageService.setItem('defaultUser', { email: "a@dd.ddd", password: "d@1Effffff" });
      this.signUpButtonData.loading = false;
      this.signUpButtonData.disabled = true;
      return response;
    },
    (error) =>{
      this.router.navigate(['/login']);
      this.localSlorageService.setItem('defaultUser', { email: "a@dd.ddd", password: "d@1Effffff" });
    }
    
    )
   
   
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
