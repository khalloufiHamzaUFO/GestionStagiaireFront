import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CandidatComponent } from './candidat/candidat.component';
import { HomeComponent } from './home/home.component';
import { SingleCandidatComponent } from './single-candidat/single-candidat.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'candidat/id:', component: SingleCandidatComponent},
  {path: 'candidats', component: CandidatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
