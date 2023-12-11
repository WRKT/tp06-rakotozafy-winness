import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/services/produit.service';
import { Produit } from 'src/app/shared/models/produit.model';
import { AddProduit } from 'src/app/shared/actions/panier-actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.css']
})

export class ListeProduitComponent implements OnInit {

  produits: Produit[] = [];

  constructor(private produitService : ProduitService, private store: Store) { }

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

  addProduit(produit: Produit) {
    this.store.dispatch(new AddProduit(produit));
  }
}
