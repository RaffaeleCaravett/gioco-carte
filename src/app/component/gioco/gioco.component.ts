import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from 'src/app/core/auth.guard';
import { CardService } from 'src/app/services/card.service';
import { PartitaService } from 'src/app/services/partita.service';
import { ScoreComponent } from 'src/app/shared/score/score.component';

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
clockStarted:boolean=false
user:any
constructor(private authGuard:AuthGuard,private cardService:CardService,private toastr: ToastrService,private dialog:MatDialog,private partitaService:PartitaService){}

ngOnInit(): void {
  this.user=JSON.parse(localStorage.getItem('user')!)
  console.log(this.user)
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

flip(item?:any,index?:number){
  if(item&&index){
  let div = document.querySelector(`.flip-card${index}`) as HTMLElement

  if(this.previousItem&&this.previousItem.value==item.value&&this.previousItem.id!=item.id){
    this.punteggio+=1
    div.style.visibility='hidden'
    let prevDiv=document.querySelector(`.flip-card${this.previousIndex}`) as HTMLElement
    prevDiv.style.visibility='hidden'
  }

this.previousItem=item
this.previousIndex=index
  }
let interval:any
if(!this.gameStarted){
  interval=setInterval(()=>{
    this.gameStarted=true
    if(this.seconds!=0){
      this.seconds-=1

    }else{
      if(this.seconds==0&&this.minutes==0){

        this.gameStarted=false
        this.clear(interval)
        const dialogRef= this.dialog.open(ScoreComponent,{data:[this.minutes,this.seconds,this.punteggio]})
  dialogRef.afterClosed().subscribe((data:any)=>{
    if(data ==true){
      this.partitaService.createPartita({
        punteggio:this.punteggio,
        minuti:this.minutes,
        secondi:this.seconds,
        user_id:this.user.id
      }).subscribe((data:any)=>{
        this.toastr.success("Partita salvata correttamente")
      },err=>{
        this.toastr.error(err.error.message||"Qualcosa è andato storto nel salvataggio della partita")
      });   }
    this.clockStarted=false
     this.minutes=1
     this.seconds=59
  })

  }
  if(this.minutes>0){
          this.minutes-=1
        this.seconds=59
        }
    }

    },1000)
}
if(this.punteggio==15){
  this.clear(interval)
  this.gameStarted=false
  const dialogRef= this.dialog.open(ScoreComponent,{data:[this.minutes,this.seconds,this.punteggio]})
dialogRef.afterClosed().subscribe((data:any)=>{


   if(data ==true){
this.partitaService.createPartita({
  punteggio:this.punteggio,
  minuti:this.minutes,
  secondi:this.seconds,
  user_id:this.user.id
}).subscribe((data:any)=>{
  this.toastr.success("Partita salvata correttamente")
},err=>{
  this.toastr.error(err.error.message||"Qualcosa è andato storto nel salvataggio della partita")
});   }
   this.clockStarted=false
   this.minutes=1
   this.seconds=59
})

}
}
clear(interval:any){
  clearInterval(interval)
}
}
