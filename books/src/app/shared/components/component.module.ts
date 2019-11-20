import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { LoaderComponent, ButtonComponent, AlertComponent } from '.';

@NgModule({
  declarations: [
    ButtonComponent,
    AlertComponent,
    LoaderComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ButtonComponent,
    AlertComponent,
    LoaderComponent,
  ],
  entryComponents: [
    AlertComponent,
  ],

 
})
export class ComponentModule { }
