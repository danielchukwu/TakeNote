import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { AlertCardComponent } from './components/alert-card/alert-card.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { SquareButtonComponent } from './components/buttons/square-button/square-button.component';
import { IconButtonComponent } from './components/buttons/icon-button/icon-button.component';



@NgModule({
  declarations: [
    CapitalizePipe,
    AlertCardComponent,
    HeaderComponent,
    SquareButtonComponent,
    IconButtonComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  exports: [ AlertCardComponent, HeaderComponent, IconButtonComponent, CommonModule, FormsModule, CapitalizePipe ]
})
export class SharedModule { }
