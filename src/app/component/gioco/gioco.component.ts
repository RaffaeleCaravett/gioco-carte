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
shuffledCards:any[]=[]
punteggio:number=0
minutes:number=1
seconds:number=59
gameStarted=false
previousItem:any
previousIndex:any

constructor(private authGuard:AuthGuard,private cardService:CardService,private toastr: ToastrService){}

ngOnInit(): void {
  this.loggedIn=this.authGuard.isAuthenticated
  if(this.loggedIn){
this.cardService.getCards().subscribe((data:any)=>{
  this.shuffle(data)
  this.cards=data
  this.toastr.success('Accesso effettuato')
})
  }else{
this.toastr.error('Devi effettuare l\'accesso per poter giocare')
  }

}

shuffle(array:any) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex > 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

flip(item:any,index:number){
  let div = document.querySelector(`.flip-card${index}`) as HTMLElement

  if(this.previousItem&&this.previousItem.value==item.value&&this.previousItem.cartType==item.cartType&&this.previousItem.color==item.color&&this.previousItem.id!=item.id){
    this.punteggio+=1
    div.style.visibility='hidden'
    let prevDiv=document.querySelector(`.flip-card${this.previousIndex}`) as HTMLElement
    prevDiv.style.visibility='hidden'
  }

this.previousItem=item
this.previousIndex=index
let interval:any
if(!this.gameStarted){
  interval=setInterval(()=>{
    this.seconds-=1
    if(this.seconds==0){
      if(this.minutes>0){
        this.minutes-=1
      }
      this.seconds=59
    }
    if(this.seconds==0&&this.minutes==0){
      this.gameStarted=false
      this.clear(interval)
    }
    },1000)
}
  this.gameStarted=true
if(this.punteggio==15){
  this.clear(interval)
}
}
clear(interval:any){
  clearInterval(interval)
}
}
