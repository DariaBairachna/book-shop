import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  
  constructor(private validateForm: FormBuilder) {
     
  }
  public validate(formName: FormGroup){
      formName = this.validateForm.group({
      email: ["", Validators.required, Validators.email],
      password: ["", Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')],
      firstName: ["", Validators.required, Validators.minLength(3)],
      lastName: ["", Validators.required, Validators.minLength(3)]
    })
  }
}
