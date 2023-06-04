import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from './pipes/capitalize.pipe';



@NgModule({
  declarations: [
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [ CommonModule, FormsModule, CapitalizePipe ]
})
export class SharedModule { }
