import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SearchFilterService } from '../services/search-filter.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  ngOnInit(): void {
  }
  constructor(private searchService: SearchFilterService) { }

  @ViewChild('searchbar') searchbar!: ElementRef;

  /*za close dugme daobrise uneseni tekst */
  enteredSearchValue: string = '';
  deleteSearchText(): void {
    this.enteredSearchValue = '';
    this.onSearchTextChanged();
  }

  /*emituje dogadjaj prilikom unosa teksta jer u html ima input i poziv ove metode */
  //@Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  onSearchTextChanged() {
    //this.searchTextChanged.emit(this.enteredSearchValue);
    this.searchService.onSearchTextChanged(this.enteredSearchValue);
    console.log(this.enteredSearchValue);

  }
}
