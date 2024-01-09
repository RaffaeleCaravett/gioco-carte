import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GiocoComponent } from './components/gioco/gioco.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StatsComponent } from './components/stats/stats.component';

const routes: Routes = [
  {
path:'login',
component:LoginComponent
  },
  {
path:'gioco',
component:GiocoComponent
  },
  {
path:'stats',
component:StatsComponent
  },
  {
    path:'home',
  component:HomeComponent
      },
  {
    path:'**',
    component:NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
