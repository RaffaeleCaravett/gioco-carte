import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private log='/login'
private sign='/register'
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
}
