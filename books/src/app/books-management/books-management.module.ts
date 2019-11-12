import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { BooksComponent, BookModalComponent } from '.';
import { BooksManagementRoutingModule } from './books-management-routing.module';
import { BookService, LocalSlorageService, AuthorService } from 'app/services';

@NgModule({
  declarations: [
    BooksComponent,
    BookModalComponent
  ],
  imports: [
    SharedModule,
    SharedMaterialModule,
    BooksManagementRoutingModule,
  ],
  exports: [
    BooksComponent,
    BookModalComponent,
  ],
  providers:[
    BookService,
    AuthorService
  ],
  entryComponents: [
    BookModalComponent,
    
  ]
})
export class BooksManagementModule { }
