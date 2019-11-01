import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'books-management',
    loadChildren: () => import('./books-management/books-management.module').then(m => m.BooksManagementModule)
  },
  {
    path: 'author-management',
    loadChildren: () => import('./author-management/author-management.module').then(m => m.AuthorManagementModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
