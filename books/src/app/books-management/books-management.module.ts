import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { BooksComponent, BookModalComponent } from '.';
import { BooksManagementRoutingModule } from './books-management-routing.module';
import { BookService, LocalSlorageService, AuthorService } from 'app/services';
import { ComponentModule } from 'app/shared/components/component.module';
import { ToastrService, Toast } from 'ngx-toastr';

@NgModule({
  declarations: [
    BooksComponent,
    BookModalComponent
  ],
  imports: [
    SharedModule,
    SharedMaterialModule,
    ComponentModule,
    BooksManagementRoutingModule,
  ],
  exports: [
    BooksComponent,
    BookModalComponent,
  ],
  providers:[
    BookService,
    AuthorService,

  ],
  entryComponents: [
    BookModalComponent,
  ]
})
export class BooksManagementModule { }
