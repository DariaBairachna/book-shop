import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { AuthorModalComponent, AuthorComponent } from '.';
import { AuthorManagementRoutingModule } from './author-management-routing.module';
import { AuthorService } from 'app/services';
import { ComponentModule } from 'app/shared/components/component.module';

@NgModule({
  declarations: [
    AuthorModalComponent,
    AuthorComponent,
  ],
  imports: [
    SharedModule,
    SharedMaterialModule,
    AuthorManagementRoutingModule,
    ComponentModule,
  ],
  exports: [
    AuthorModalComponent,
    AuthorComponent,
  ],
  providers: [
    AuthorService
  ],
  entryComponents: [
    AuthorModalComponent,

  ]
})
export class AuthorManagementModule { }
