import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { DisplaySvgComponent } from './components/display-svg/display-svg.component';
import { QuickInputFieldComponent } from './components/quick-input-field/quick-input-field.component';
import { SidebarNoteCardComponent } from './components/sidebar-note-card/sidebar-note-card.component';
import { NoteComponent } from './components/note/note.component';

@NgModule({
  declarations: [
    DisplaySvgComponent,
    HomeComponent,
    NoteComponent,
    NoteCardComponent,
    QuickInputFieldComponent,
    TextFieldComponent,
    SidebarComponent,
    SidebarNoteCardComponent,
  ],
  imports: [
    CommonModule,
    TextFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [ HomeComponent ]
})
export class HomeModule { }
