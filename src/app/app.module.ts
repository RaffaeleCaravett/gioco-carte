import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { GiocoComponent } from './component/gioco/gioco.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { StatsComponent } from './component/stats/stats.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS,  HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './core/auth.guard';
import { TokenInterceptor } from './core/token.interceptor';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ScoreComponent } from './shared/score/score.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    GiocoComponent,
    NotFoundComponent,
    StatsComponent,
    NavComponent,
    FooterComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatDialogModule
  ],
  providers: [
    AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
  provideAnimations(),
  provideToastr(),
],
  bootstrap: [AppComponent]
})
export class AppModule { }

