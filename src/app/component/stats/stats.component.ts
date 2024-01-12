import { Component, OnInit } from '@angular/core';
import { ClassificaService } from 'src/app/services/classifica.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit{

classifica:any[]=[]
  constructor(private statsService:ClassificaService){}

  ngOnInit(): void {
this.statsService.getClassifica().subscribe((data:any)=>{
  if(data){
    for (let u of data.user){
      this.classifica.push(u.partite)
    }
  }
})  }

}
