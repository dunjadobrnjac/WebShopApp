import { Component, OnInit } from '@angular/core';
import { PurchasesService } from '../services/purchases.service';


interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  location: string;
  status: number;
  available: number;
  creation_date: Date;
  user_id: number;
  category_id: number;
  category_name: string;
  date: Date;

}

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.component.html',
  styleUrls: ['./my-purchases.component.css']
})
export class MyPurchasesComponent implements OnInit {

  constructor(private purchasesService: PurchasesService) { }

  items!: Item[];

  ngOnInit(): void {
    this.purchasesService.getAllPurchasesForUser(2).subscribe( //privremeno je 1 dok nema logovanja korisnika
      //kasnije ce biti proslijedjen id korisnika
      (itemsObject: any[]) => {
        this.items = itemsObject.map(itemData => {

          const item: Item = {
            id: itemData[0],
            name: itemData[1],
            description: itemData[2],
            price: itemData[3],
            location: itemData[4],
            status: itemData[5],
            available: itemData[6],
            creation_date: itemData[7],
            user_id: itemData[8],
            category_id: itemData[9],
            category_name: itemData[10],
            date: itemData[11]
          };
          return item;
        });
      }
    );
  }


  //nakon sto dobavim elemente, treba ih sortirati na osnovu datuma kupovine
  iiii = [
    {
      "id": "1",
      "title": "Samsung Galaxy A4",
      "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
      "category": "Telefoni",
      "price": 1600,
      "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
      "purchaseDate": "25.7.2022.",

    }
  ];


}
