import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { BooksComponent, BookModalComponent } from '.';
import { BooksManagementRoutingModule } from './books-management-routing.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    BooksComponent,
    BookModalComponent
  ],
  imports: [
    SharedModule,
    SharedMaterialModule,
    BooksManagementRoutingModule,
    MatInputModule
  ],
  exports: [
    BooksComponent,
    BookModalComponent,
  ],
  providers:[

  ],
  entryComponents: [
    BookModalComponent,
    
  ]
})
export class BooksManagementModule { }
