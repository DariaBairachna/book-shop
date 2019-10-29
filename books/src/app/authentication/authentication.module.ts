import { NgModule } from '@angular/core';
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent, SingUpComponent } from '.';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { ValidationService } from 'app/services';

@NgModule({
  declarations: [LoginComponent, SingUpComponent, ForgotPasswordComponent],
  imports: [
    AuthentificationRoutingModule,
    SharedModule,
    SharedMaterialModule,
  ],
  providers:[
    ValidationService
  ]
})
export class AuthenticationModule { }
