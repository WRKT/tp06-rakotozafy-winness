import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, tap, switchMap, catchError } from 'rxjs/operators';
import { ProduitService } from 'src/services/produit.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  model?: Observable<any>;
  searchField$?: Observable<any>;

  @ViewChild('input', { static: true }) input!: ElementRef;

  constructor(private _service: ProduitService) {
  }

  ngAfterViewInit() {
    this.searchField$ = fromEvent(this.input.nativeElement, 'keyup');
    this.model = this.searchField$.pipe(
      map((event) => event.target.value),
      debounceTime(300),
      distinctUntilChanged(),

      switchMap((term) =>
        this._service.search(term).pipe(
          catchError(() => {
            return of([]);
          })
        )
      )
    );
  }
}