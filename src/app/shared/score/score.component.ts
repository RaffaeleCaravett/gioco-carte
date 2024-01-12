import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit{


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {

  }

}
