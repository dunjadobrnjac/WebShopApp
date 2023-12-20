import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Category {
  id: number;
  name: string;
  status: number;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  city: string;
  email: string;
  telephone: string;
  status: number;
}

interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  location: string;
  status: number;
  available: number;
  creation_date: Date;
  user: User;
  category: Category;
}

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
    return this.items.reduce((total, item) => total + parseInt(item.price, 10), 0);
  }
}
