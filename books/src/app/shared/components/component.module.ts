import { NgModule } from '@angular/core';
import { ButtonComponent } from './buttons/button-component.component'
import { AlertComponent } from './alert/alert.component';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [
    ButtonComponent,
    AlertComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ButtonComponent,
    AlertComponent,
  ],
  entryComponents: [
    AlertComponent,
  ],

 
})
export class ComponentModule { }
