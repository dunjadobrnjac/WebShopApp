import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { UserService } from '../services/user.service';
import { AttributeService } from '../services/attribute.service';
import { ImageService } from '../services/image.service';

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
  images: string[];
}

interface Attribute {
  id: number;
  name: string;
  status: number;
  category: Category,
}

interface ItemAttribute {
  id: number;
  item: Item;
  attribute: Attribute;
  value: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  selectedProduct!: Item; //odabrani proizvod

  constructor(private route: ActivatedRoute,
    private itemService: ItemService,
    private userService: UserService,
    private attributeService: AttributeService,
    private imageService: ImageService) { }

  activeUser!: User;
  attributes: ItemAttribute[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const elementId = params['id'];
      //treba dohvatiti element na osnovu id i sacuvati ga u selectedProduct
      this.itemService.getItemById(elementId).subscribe(
        (item: Item) => {
          this.selectedProduct = item;
          this.imageService.getImagesForItem(item.id).subscribe(
            data => {
              item.images = data;
              let s = JSON.stringify(data);
              item.images = JSON.parse(s).images;

            }
          )
        }
      );

      this.attributeService.getItemAttributes(elementId).subscribe(
        attr => {
          this.attributes = attr;
        }
      );
    });

    this.userService.getUserById(1).subscribe( //dohvata trenutnog korisnika
      user => {
        this.activeUser = user;
      }
    );

  }

}
