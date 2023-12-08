import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ItemService } from '../services/item.service';

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

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent {
  items: Item[] = [];
  totalPrice: number = 0;

  isSecondStepCompleted: boolean = false;
  showPaymentStep: boolean = true;

  showThirdStep(): void {
    if (this.paymentControl.valid && this.items.length > 0) {
      this.isSecondStepCompleted = true;
      this.showPaymentStep = false; /*da ne prikaze placanje i brisanje elemenata nakon potvrde kupovine */

      //korisnik je kliknuo na zavrsi kupovinu
      //prikazuje mu se potvrda o kupovini
      //treba kupcu dodati odabrane proizvode u njegovu kupovinu



      //treba proizvode oznaci kao zavrseno da se ne prikazuju na pocetnoj stranici
      for (const item of this.items) {
        console.log("kupljen--> " + item.name);
        this.itemService.updateItemAvailability(item.id).subscribe(
          () => {
            console.log("availability updated");
          }
        );
      }

      //prazni korpu na interfejsu
      this.shoppingCartService.clearShoppingCart();
    }

  }

  /*kontrola za unos nacina placanja */
  paymentControl = new FormControl('', Validators.required);

  constructor(public dialog: MatDialog,
    private shoppingCartService: ShoppingCartService,
    private itemService: ItemService) {

  }

  ngOnInit(): void {
    this.shoppingCartService.cartItemsSubject.subscribe(() => {
      this.totalPrice = this.shoppingCartService.getTotalPrice();
      this.items = this.shoppingCartService.getItemsFromShoppingCart();
    });
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ConfirmDeleteDialogComponent
      , {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      })
  }

  /*brisanje jednog proizvoda */
  deleteItem(item: any) {
    this.shoppingCartService.removeItemFromShoppingCart(item);
  }

}

