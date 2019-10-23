import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent, HeaderComponent } from '.';



const routes: Routes = [
    {
        path: 'login',
        component: FooterComponent
    },
    {
        path: 'sign-up',
        component: HeaderComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {


}
