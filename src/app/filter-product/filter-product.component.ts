import { Component, Input, OnInit } from '@angular/core';
import { SearchFilterService } from '../services/search-filter.service';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { User, Category, Item } from '../interface/interfaces';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.css']
})
export class FilterProductComponent implements OnInit {

  //atributi za pretragu
  itemName: string = '';
  itemCategory: string = '';
  itemPriceMin: string = '';
  itemPriceMax: string = '';
  itemStatus: string = '';
  itemLocation: string = '';

  showFilterDiv: boolean = false;

  displayFilterDiv(): void {
    this.showFilterDiv = !this.showFilterDiv;
  }

  @Input() allItems!: Item[];
  filteredItems: any[] = [];

  allcategories = ['--'];
  alllocations = ['--'];

  categories: Category[] = [];
  locations: any;

  constructor(private filterService: SearchFilterService,
    private categoryService: CategoryService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    //dobavljanje svih kategorija iz baze
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.categories = categories;

        for (const cat of this.categories) {
          this.allcategories.push(cat.name);
        }
      }
    );


    //dobavljanje lokacija za filtriranje
    this.itemService.getAllItemLocations().subscribe(
      locations => {
        this.locations = locations;

        for (const l of this.locations) {
          this.alllocations.push(l);
        }
      }
    );
  }

  clickFilterItems() {
    let isActive = false;
    console.log(this.allItems);

    if (this.itemName !== '') {
      console.log("filter name " + this.itemName);
      if (isActive) {
        this.filteredItems = this.filteredItems.filter(item =>
          item.name.toLowerCase().includes(this.itemName.toLowerCase()));
      } else {
        this.filteredItems = this.allItems.filter(item =>
          item.name.toLowerCase().includes(this.itemName.toLowerCase()));
      }
      isActive = true;
    }

    if (this.itemCategory !== '' && this.itemCategory !== '--') {
      console.log("filter category " + this.itemCategory);
      if (isActive) {
        this.filteredItems = this.filteredItems.filter(item =>
          item.category === this.itemCategory);
      } else {
        this.filteredItems = this.allItems.filter(item =>
          item.category.name === this.itemCategory);
      }
      isActive = true;
    }

    if (this.itemPriceMin !== '') {
      console.log("filter cijena min " + this.itemPriceMin);
      if (isActive) {
        this.filteredItems = this.filteredItems.filter(item =>
          item.price >= this.itemPriceMin);
      } else {
        this.filteredItems = this.allItems.filter(item =>
          item.price >= this.itemPriceMin);
      }
      isActive = true;
    }

    if (this.itemPriceMax !== '') {
      console.log("filter cijena max " + this.itemPriceMax);
      if (isActive) {
        this.filteredItems = this.filteredItems.filter(item =>
          item.price <= this.itemPriceMax);
      } else {
        this.filteredItems = this.allItems.filter(item =>
          item.price <= this.itemPriceMax);
      }
      isActive = true;
    }

    if (this.itemStatus !== '' && this.itemStatus !== '--') {
      console.log("filer stanje " + this.itemStatus);
      if (isActive) {
        this.filteredItems = this.filteredItems.filter(item =>
          item.status === this.itemStatus);
      } else {
        this.filteredItems = this.allItems.filter(item =>
          item.status === parseInt(this.itemStatus));
      }
      isActive = true;
    }

    if (this.itemLocation !== '' && this.itemLocation !== '--') {
      console.log("filter lokacija " + this.itemLocation);
      if (isActive) {
        this.filteredItems = this.filteredItems.filter(item =>
          item.location === this.itemLocation);
      } else {
        this.filteredItems = this.allItems.filter(item =>
          item.location === this.itemLocation);
      }
      isActive = true;
    }

    //ako nije unesen ni jedan parametar a klikne filtriraj
    if (this.itemName === '' && (this.itemCategory === '' || this.itemCategory === '--')
      && this.itemPriceMin === '' && this.itemPriceMax === ''
      && (this.itemStatus === '' || this.itemStatus === '--')
      && (this.itemLocation === '' || this.itemLocation === '--')) {
      this.filteredItems = this.allItems;
    }


    this.filterService.onFilteringItems(this.filteredItems);
  }
}
