import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PartitaService {
private partita:string ='/partita'
  constructor(private http:HttpClient) { }


  createPartita(body:{}){
    return this.http.post(environment.API_URL+this.partita,body)
  }
}
