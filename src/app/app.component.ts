import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from './core/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'giocoCarte';

  constructor(private router:Router,private authService:AuthService,private toastr:ToastrService,private authGuard :AuthGuard){}

  ngOnInit(): void {
let accessToken=localStorage.getItem('accessToken')!
let refreshToken=localStorage.getItem('refreshToken')!
console.log(accessToken,refreshToken)
  if(accessToken){
this.authService.verifyToken(accessToken).subscribe((data:any)=>{
this.toastr.success("utente verificato con successo")
localStorage.setItem('user',JSON.stringify(data))
this.authService.setToken(accessToken)
this.authService.token=accessToken
this.authGuard.authenticateUser(true)

this.router.navigate(['/gioco'])

},err=>{
  this.authGuard.authenticateUser()
if(refreshToken){
  this.authService.verifyRefreshToken(refreshToken).subscribe((data:any)=>{
    if(data){
      this.authService.verifyToken(data.accessToken).subscribe((dat:any)=>{
        this.toastr.success("utente verificato con successo")
localStorage.setItem('user',JSON.stringify(data))
this.authService.setToken(accessToken)
this.authService.token=accessToken
this.authGuard.authenticateUser(true)
  this.router.navigate(['/gioco'])
    })
    }
  },err=>{
    this.authGuard.authenticateUser()
    this.toastr.error(err.error.message||"Utente non verificato")
  })
}
})
  }
  }


}
