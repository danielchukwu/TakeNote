import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { DisplaySvgComponent } from './components/display-svg/display-svg.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { QuickInputFieldComponent } from './components/quick-input-field/quick-input-field.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarNoteCardComponent } from './components/sidebar-note-card/sidebar-note-card.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { NoteComponent } from './components/note/note.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeRoutingModule } from './home-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    HomeComponent,
    DisplaySvgComponent,
    NoteCardComponent,
    QuickInputFieldComponent,
    SidebarComponent,
    SidebarNoteCardComponent,
    TextFieldComponent,
    NoteComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    TextFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    NgxSkeletonLoaderModule
  ]
})
export class HomeModule { }
