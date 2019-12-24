import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TutorialComponent} from './tutorial/tutorial.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: '../app/login/login.module#LoginModule'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tutorial',
    component: TutorialComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
