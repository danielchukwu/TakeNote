import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { SignUpComponent } from './features/auth/pages/sign-up/sign-up.component';
import { authGuard, registerOrLoginGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
  {path: 'login', component: LoginComponent, canActivate: [registerOrLoginGuard]},
  {path: 'sign-up', component: SignUpComponent, canActivate: [registerOrLoginGuard]},
  {path: '**', redirectTo: "", pathMatch: "full", canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
