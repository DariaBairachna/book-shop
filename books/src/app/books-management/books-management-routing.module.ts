
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from '.';

const routes: Routes = [
    {
        path: '',
        component: BooksComponent,
        data: { title: "Books Management | Books" }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BooksManagementRoutingModule {

}
