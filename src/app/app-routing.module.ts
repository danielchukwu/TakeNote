import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { SignUpComponent } from './features/auth/pages/sign-up/sign-up.component';
import { authGuard, unAuthenticatedGuard } from './core/guards/auth.guard';
import { WelcomeComponent } from './features/welcome/welcome.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
  // {path: 'welcome', component: WelcomeComponent, canActivate: [unAuthenticatedGuard]},
  {path: 'login', component: LoginComponent, canActivate: [unAuthenticatedGuard]},
  {path: 'sign-up', component: SignUpComponent, canActivate: [unAuthenticatedGuard]},
  {path: '**', redirectTo: "", pathMatch: "full", canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
