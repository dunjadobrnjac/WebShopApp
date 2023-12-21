import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ItemServiceService } from '../services/item-service.service';
import { ItemService } from '../services/item.service';

import { Location } from '@angular/common';
import { Item } from '../interface/interfaces';


@Component({
  selector: 'app-item-component',
  templateUrl: './item-component.component.html',
  styleUrls: ['./item-component.component.css']
})
export class ItemComponentComponent {

  @Input() item!: Item;
  @Input() searchText: string = '';

  /*za kupi ili zavrseno dugmiće*/
  @Input() isOver: boolean = false;
  @Input() isOwner: boolean = false;


  constructor(private snackbar: MatSnackBar,
    private router: Router,
    private location: Location,
    private shoppingCartService: ShoppingCartService,
    private itemService: ItemService) { }


  /*obrada klika na dugme datalji na kartici, kao i klik na karticu*/
  showItemDetails(item: Item): void {
    this.router.navigate(['/product-details', item.id]);
    console.log("images " + item.images);
  }

  /*obrada klika na dugme kupi */
  addItem(item: Item): void {
    //dodavanje u shopping cart
    if (this.shoppingCartService.addItemToShoppingCart(item)) {
      this.snackbar.open("Artikal '" + item.name + "' je dodan u korpu.", "",
        {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      )
    } else {
      this.snackbar.open("Artikal je već u korpi.", "",
        {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      )
    }
  }

  /*obrada klika na dugme obrisi, ako je vlasnik oglasa*/
  ownerDeleteItem(item: Item) {
    //oznaci artikal u bazi available 2 ( ne brise iz baze)
    this.itemService.deleteItem(item.id).subscribe(
      response => {
        if (response != null) {
          this.snackbar.open("Artikal '" + item.name + "' je uspješno obrisan.", "",
            {
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          )
          window.location.reload();

        } else {
          this.snackbar.open("Brisanje artikla '" + item.name + "' nije uspjelo.", "",
            {
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          )
        }
      }
    );
  }

}
