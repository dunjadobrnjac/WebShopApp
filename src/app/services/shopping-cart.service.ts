import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private items: Item[] = [];
  totalPrice: number = 0;

  /*zbog headera i dodavanja u korpu*/
  cartItemsSubject = new BehaviorSubject<Item[] | null>([]);

  addItemToShoppingCart(addedItem: Item): boolean {
    if (this.items.filter(item => item.id === addedItem.id).length === 0) {
      this.items.push(addedItem);
      this.cartItemsSubject.next(this.items); //emituje promjenu kako bi se obavijestila komponenta
      return true;
    } else
      return false;
  }

  removeItemFromShoppingCart(item: Item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.cartItemsSubject.next(this.items);
    }
  }

  clearShoppingCart() {
    this.items = [];
    this.cartItemsSubject.next(this.items);
  }

  getItemsFromShoppingCart() {
    return this.items;
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + this.parsePrice(item.price), 0);
  }

  parsePrice(price: string): number {
    // Ukloni razmake iz cijene i pretvori u broj
    const cleanedPrice = price.replace(/\s/g, '');
    return parseInt(cleanedPrice, 10);
  }
}
