import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { BooksManagementComponent } from './books-management.component';
import { BooksManagementRoutingModule } from './books-management-routing.module';

@NgModule({
  declarations: [BooksManagementComponent],
  imports: [
    SharedModule,
    SharedMaterialModule,
    BooksManagementRoutingModule,
  ],
  providers:[

  ]
})
export class BooksManagementModule { }
