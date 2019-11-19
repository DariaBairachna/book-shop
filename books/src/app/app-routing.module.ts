import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInUserGuard, LoggedOutUserGuard } from './core/guards';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [LoggedOutUserGuard],
  },
  {
    path: 'books-management',
    loadChildren: () => import('./books-management/books-management.module').then(m => m.BooksManagementModule),
    canActivate: [LoggedInUserGuard]
  },
  {
    path: 'author-management',
    loadChildren: () => import('./author-management/author-management.module').then(m => m.AuthorManagementModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoggedInUserGuard,
    LoggedOutUserGuard]
})
export class AppRoutingModule { }
