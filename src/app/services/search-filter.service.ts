import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {

  enteredSearchText = new BehaviorSubject<string>('');
  chipsCategoryFilter = new Subject<string>();
  itemsFilering = new Subject<any[]>();

  onSearchTextChanged(enteredText: string) {
    this.enteredSearchText.next(enteredText);
  }

  onSelectCategoryChip(selectedCategory: string) {
    this.chipsCategoryFilter.next(selectedCategory);
  }

  onFilteringItems(filteredItems: any[]) {
    this.itemsFilering.next(filteredItems);
  }
}
