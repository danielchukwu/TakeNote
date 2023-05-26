import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteComponent } from './features/notes/pages/note/note.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { SignUpComponent } from './features/auth/pages/sign-up/sign-up.component';

const routes: Routes = [
  {path: '', component: NoteComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
