import { authGuard } from "src/app/core/guards/auth.guard";
import { NoteComponent } from "./components/note/note.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    children: [
      {path: 'n/:id', component: NoteComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
