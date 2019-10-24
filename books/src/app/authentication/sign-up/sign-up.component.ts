import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { User } from '../../model';
import { LocalSlorageService, AuthentificationService } from '../../service';


@Component({
  selector: 'app-sing-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SingUpComponent implements OnInit {
  public signUpForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private authService: AuthentificationService,
    private localSlorageService: LocalSlorageService,
    private router: Router) {
    this.signUpForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  ngOnInit() {
  }


  public onSubmit() {
    this.router.navigate(['/login']);
    this.authService.signUp(this.signUpForm.value).subscribe((response: User) => {
   
      return response;

    })

    //for add default user
    this.localSlorageService.setItem('defaultUser', { email: "a@dd.ddd", password: "d@1Effffff" });

  }
}
