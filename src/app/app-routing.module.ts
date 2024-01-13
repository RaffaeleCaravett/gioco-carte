import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { GiocoComponent } from './component/gioco/gioco.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { StatsComponent } from './component/stats/stats.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
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
