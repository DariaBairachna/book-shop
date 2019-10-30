import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from 'app/core/core.module';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
 
  ],
 
})
export class SharedModule { }
