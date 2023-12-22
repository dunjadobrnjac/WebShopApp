import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { UserService } from '../services/user.service';
import { AttributeService } from '../services/attribute.service';
import { ImageService } from '../services/image.service';
import { User, ItemAttribute, Item } from '../interface/interfaces';


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

    const ls = localStorage.getItem("activeUserId");
    const activeUserId = ls != null ? parseInt(ls, 10) : 0;
    this.userService.getUserById(activeUserId).subscribe( //dohvata trenutnog korisnika
      user => {
        this.activeUser = user;
      }
    );

  }

}
