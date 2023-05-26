import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './pages/note/note.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    NoteComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [ NoteComponent ]
})
export class NotesModule { }
