import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from 'src/app/core/auth.guard';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  log:boolean=true
  loginForm!:FormGroup
  registerForm!:FormGroup
  error:string=''
  user:any
constructor(private authService:AuthService,private authGuard:AuthGuard,private router:Router,private toastr:ToastrService){}

  ngOnInit(): void {
  this.loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password:new FormControl('',Validators.required)
  })
  this.registerForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    username:new FormControl('',[Validators.required,Validators.minLength(3)]),
    nome:new FormControl('',[Validators.required,Validators.minLength(3)]),
    password:new FormControl('',[Validators.required,Validators.minLength(3)]),
    ripetiPassword:new FormControl('',[Validators.required,Validators.minLength(3)])
  })
  }


login(){
if(this.loginForm.valid){
  this.authService.login({email:this.loginForm.controls['email'].value,password:this.loginForm.controls['password'].value}).subscribe((data:any)=>{
    if(data){
      this.authService.setToken(data.tokens.accessToken)
      localStorage.setItem('accessToken',data.tokens.accessToken)
      localStorage.setItem('refreshToken',data.tokens.refreshToken)
      this.authGuard.authenticateUser(true)
      this.router.navigate(['/gioco'])
    }
  },err=>{
    this.error=err.error.message
    this.toastr.error(err.error.message)
    this.authGuard.authenticateUser()
  });
}else{
  this.toastr.error('Registrazione negata')
  this.error="Compila correttamente il form"
}

}
signup(){
  if(this.registerForm.valid&&this.registerForm.controls['password'].value==this.registerForm.controls['ripetiPassword'].value){
    this.authService.signup({email:this.registerForm.controls['email'].value,password:this.registerForm.controls['password'].value,nome:this.registerForm.controls['nome'].value,
    username:this.registerForm.controls['username'].value}).subscribe((data:any)=>{
     this.log=true
     this.toastr.success('Registrazione effettuata')
    },err=>{
      this.error=err.error.message
      this.toastr.error(err.error.message)
    this.log=false;
    });
  }else{
    this.toastr.error('Registrazione negata')
    this.error="Compila correttamente il form"
  }
}
}
