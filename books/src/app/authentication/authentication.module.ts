import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ValidationService } from '../service/validation.service';
import { LoginComponent, SingUpComponent } from '.';

@NgModule({
  declarations: [LoginComponent, SingUpComponent],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    SharedModule,
  ],
  providers:[
    ValidationService 
  ]
})
export class AuthenticationModule { }
