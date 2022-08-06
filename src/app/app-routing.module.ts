import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudetComponent } from './user/add-studet/add-studet.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentDetailsComponent } from './user/student-details/student-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path:'user',
    loadChildren: () => import('./user/user.module').then(mod => mod.UserModule),
    canActivate: [AuthGuardService]
  },
  {
    path : 'login',
    component : LoginComponent,
  },
  {
    path : 'forgot',
    component : ForgotPasswordComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    redirectTo : 'login',
    pathMatch : 'full'
  },
  {
    path: 'homePage',
    component: HomePageComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'addStudent',
    component: AddStudetComponent
  },
  {
    path: 'studentDetails',
    component: StudentDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
