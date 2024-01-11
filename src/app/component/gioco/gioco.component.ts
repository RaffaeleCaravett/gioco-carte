import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/core/auth.guard';

@Component({
  selector: 'app-gioco',
  templateUrl: './gioco.component.html',
  styleUrls: ['./gioco.component.scss']
})
export class GiocoComponent implements OnInit{

loggedIn:boolean=false

constructor(private authGuard:AuthGuard){}

ngOnInit(): void {
  this.loggedIn=this.authGuard.isAuthenticated
}
}
