import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes';

@NgModule({
  declarations: [
    FilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterPipe,
  ],
 
})
export class SharedModule { }
