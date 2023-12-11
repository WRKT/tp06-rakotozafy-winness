import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Produit } from 'src/app/shared/models/produit.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ProduitService {
    constructor(private http:HttpClient) { }
      
    getProduits() : Observable<Produit[]> {
      return this.http.get<Produit[]>(environment.backendCatalogue);
    }

    search(term: string) {
      console.log(term);
      return this.http.get(`https://si-web-winness-rakotozafy.onrender.com/api/catalogue/${term}`)
    }
}

