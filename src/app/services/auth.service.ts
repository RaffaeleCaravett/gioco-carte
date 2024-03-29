import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private log='/auth/login'
private sign='/auth/register'
public token:String|null=null
constructor(private router:Router,private http:HttpClient) { }


navigateHome(){
 return this.router.navigate(['/home'])
}

login(body:any){
return this.http.post(environment.API_URL+this.log,body)
}

signup(body:any){
  return this.http.post(environment.API_URL+this.sign,body)
  }
  setToken(token:string){
    this.token=token
  }
  verifyToken(token:string){
    return this.http.get(environment.API_URL+'/auth/'+token)
  }
  verifyRefreshToken(refreshToken:string){
    return this.http.get(environment.API_URL+'/auth/refreshToken'+refreshToken)
  }
}
