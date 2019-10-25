import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LocalSlorageService } from '../service/localSlorage.service';
import { LoginComponent, SingUpComponent } from '.';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [LoginComponent, SingUpComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    SharedModule,
  ],
  providers:[

  ]
})
export class AuthenticationModule { }
