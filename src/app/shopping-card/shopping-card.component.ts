import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ItemService } from '../services/item.service';
import { UserService } from '../services/user.service';
import { PurchasesService } from '../services/purchases.service';
import { User, Item } from '../interface/interfaces';

interface Purchase {
  //id: number;
  date: Date;
  user: User;
}

interface PurchaseItem {
  //id: number;
  purchase: any; //to je purchase ali sa id, nakon upisa u bazu
  item: Item;
}

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent {


  constructor(public dialog: MatDialog,
    private shoppingCartService: ShoppingCartService,
    private itemService: ItemService,
    private userService: UserService,
    private purchaseService: PurchasesService) {

  }


  ngOnInit(): void {
    this.shoppingCartService.cartItemsSubject.subscribe(() => {
      this.totalPrice = this.shoppingCartService.getTotalPrice();
      this.items = this.shoppingCartService.getItemsFromShoppingCart();
      console.log("items --> " + this.items);
      console.log("items --> " + JSON.stringify(this.items));
    });
  }

  activeUser!: User;
  purchase!: Purchase;
  purchaseItems: PurchaseItem[] = [];

  items: Item[] = [];
  totalPrice: number = 0;

  isSecondStepCompleted: boolean = false;
  showPaymentStep: boolean = true;

  showThirdStep(): void {
    if (this.paymentControl.valid && this.items.length > 0) {

      //korisnik je kliknuo na zavrsi kupovinu
      //prikazuje mu se potvrda o kupovini
      //treba kupcu dodati odabrane proizvode u njegovu kupovinu

      //dobavljanje trenutnog korisnika
      const ls = localStorage.getItem("activeUserId");
      const activeUserId = ls != null ? parseInt(ls, 10) : 0;
      this.userService.getUserById(activeUserId).subscribe(
        user => {
          this.activeUser = user;

          console.log(this.activeUser);

          this.purchase = {
            date: new Date(),
            user: user,
          }

          console.log(this.purchase);

          this.purchaseService.addNewPurchase(this.purchase).subscribe(
            response => {
              if (response != null) {//ako je upisana kupovina, upise i artikle

                console.log("upisao je kupovinu");
                for (const item of this.items) {
                  this.purchaseItems.push({
                    purchase: response,
                    item: item,
                  });
                }

                this.purchaseService.addNewPurchaseItems(this.purchaseItems).subscribe(
                  response => {
                    console.log(response);
                    if (response != null) {
                      //treba proizvode oznaci kao zavrseno da se ne prikazuju na pocetnoj stranici
                      //setuje status na 0 u bazi
                      console.log("usao ovde");
                      for (const item of this.items) {
                        console.log("kupljen --> " + item.name);
                        this.itemService.updateItemAvailability(item.id).subscribe(
                          response => {
                            console.log(response);

                            if (response != null) {
                              this.isSecondStepCompleted = true;
                              this.showPaymentStep = false; //da ne prikaze placanje i brisanje elemenata nakon potvrde kupovine 
                              //prazni korpu na interfejsu
                              this.shoppingCartService.clearShoppingCart();
                            }
                          }
                        );
                      }
                    }
                  }
                );
              }
            }
          );
        }
      );
    }

  }

  /*kontrola za unos nacina placanja */
  paymentControl = new FormControl('', Validators.required);

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

