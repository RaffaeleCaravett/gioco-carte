import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from 'src/app/core/auth.guard';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-gioco',
  templateUrl: './gioco.component.html',
  styleUrls: ['./gioco.component.scss']
})
export class GiocoComponent implements OnInit{

loggedIn:boolean=false
cards:any[]=[]
constructor(private authGuard:AuthGuard,private cardService:CardService,private toastr: ToastrService){}

ngOnInit(): void {
  this.loggedIn=this.authGuard.isAuthenticated
  if(this.loggedIn){
this.cardService.getCards().subscribe((data:any)=>{
  this.cards=data
  this.toastr.success('Accesso effettuato')
})
  }else{
this.toastr.error('Devi effettuare l\'accesso per poter giocare')
  }
}
}
