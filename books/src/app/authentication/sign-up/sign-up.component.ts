import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { UserViewModel } from 'app/shared/models';
import { ValidationService, LocalSlorageService, AuthentificationService } from 'app/services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-sing-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SingUpComponent implements OnInit, OnDestroy {
  public signUpForm: FormGroup;
  private destroyed: Subject<boolean> = new Subject<boolean>();
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
    })
  }

  ngOnInit() {
  }

  public onSubmit() {
    if (this.signUpForm.invalid) {
      return false;
    }

    this.authService.signUp(this.signUpForm.value).pipe(takeUntil(this.destroyed)).subscribe((response: UserViewModel) => {
      return response;
    })
    this.router.navigate(['/login']);
    this.localSlorageService.setItem('defaultUser', { email: "a@dd.ddd", password: "d@1Effffff" });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
