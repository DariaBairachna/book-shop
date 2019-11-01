
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorComponent } from '.';

const routes: Routes = [
    {
        path: '',
        component: AuthorComponent,
        data: { title: "Author Management | Books" }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthorManagementRoutingModule {

}
