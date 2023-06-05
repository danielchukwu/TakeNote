import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { AlertCardComponent } from './components/alert-card/alert-card.component';



@NgModule({
  declarations: [
    CapitalizePipe,
    AlertCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [ AlertCardComponent, CommonModule, FormsModule, CapitalizePipe ]
})
export class SharedModule { }
