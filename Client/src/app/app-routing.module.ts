import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import {CustomerExperienceComponent} from "./customer-experience/customer-experience.component";
import {DetailsComponent} from "./details/details.component";
import {TechnologyComponent} from "./technology/technology.component";


const routes: Routes = [
  {path:'signup', component:SignUpComponent},
  {path:'customer',component:CustomerExperienceComponent},
  {path:'customer/:userId/:screen',component:CustomerExperienceComponent},
  {path:'technology', component:TechnologyComponent},
  {path:'technology/:userId/:screen', component:TechnologyComponent},
  {path:'details', component:DetailsComponent},
  {path:'details/:userId/:screen', component:DetailsComponent},

  // {path:'preview/:userId', component:PreviewComponent},
  {
    path:'',
    redirectTo:'/signup',
    pathMatch:'full'
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
