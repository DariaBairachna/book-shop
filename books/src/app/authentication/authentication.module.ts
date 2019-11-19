import { NgModule } from '@angular/core';
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent, SingUpComponent } from '.';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { AuthentificationService } from 'app/services';
import { ComponentModule } from 'app/shared/components/component.module';

@NgModule({
  declarations: [LoginComponent, SingUpComponent, ForgotPasswordComponent],
  imports: [
    AuthentificationRoutingModule,
    SharedModule,
    ComponentModule,
    SharedMaterialModule,
  ],
  providers:[
      AuthentificationService
  ],
  
})
export class AuthenticationModule { }
