import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { User } from 'app/shared/models';
import { ValidationService, LocalSlorageService, AuthentificationService } from 'app/services';


@Component({
  selector: 'app-sing-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SingUpComponent implements OnInit {
  public signUpForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private localSlorageService: LocalSlorageService,
    private router: Router,
    private validationService: ValidationService) {
    this.signUpForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.validationService.validatePassword]),
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

    this.authService.signUp(this.signUpForm.value).subscribe((response: User) => {

      return response;

    })
    this.router.navigate(['/login']);
    //for add default user
    this.localSlorageService.setItem('defaultUser', { email: "a@dd.ddd", password: "d@1Effffff" });

  }
}
