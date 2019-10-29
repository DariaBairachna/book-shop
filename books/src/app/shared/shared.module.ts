import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from './dialog/dialog.module';
import { CoreModule } from 'app/core/core.module';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    CoreModule,
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    CoreModule,
 
  ],
 
})
export class SharedModule { }
