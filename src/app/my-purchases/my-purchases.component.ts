import { Component, OnInit } from '@angular/core';
import { PurchasesService } from '../services/purchases.service';
import { ImageService } from '../services/image.service';


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
  images: string[];
}

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.component.html',
  styleUrls: ['./my-purchases.component.css']
})
export class MyPurchasesComponent implements OnInit {

  constructor(private purchasesService: PurchasesService,
    private imageService: ImageService) { }

  items!: Item[];

  ngOnInit(): void {
    const ls = localStorage.getItem("activeUserId");
    const activeUserId = ls != null ? parseInt(ls, 10) : 0;
    this.purchasesService.getAllPurchasesForUser(activeUserId).subscribe(
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
            date: itemData[11],
            images: []
          };
          return item;
        });
        for (let item of this.items) {
          this.imageService.getImagesForItem(item.id).subscribe(
            data => {
              item.images = data;
              let s = JSON.stringify(data);
              item.images = JSON.parse(s).images;

            }
          )
        }
      }
    );
  }

}
