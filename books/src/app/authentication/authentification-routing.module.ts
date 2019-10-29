import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, SingUpComponent, ForgotPasswordComponent } from '.';



const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { title: "Login | Books" }
    },
    {
        path: 'sign-up',
        component: SingUpComponent,
        data: { title: "Sign Up | Books" }
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { title: "Forgot Password | Books" }
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthentificationRoutingModule {
}
