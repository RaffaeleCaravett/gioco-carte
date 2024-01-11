import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {
    private card ='/carta'

      constructor(private http:HttpClient) { }

    getClassifica(){
    return this.http.get(environment.API_URL+this.card)
    }

    }
