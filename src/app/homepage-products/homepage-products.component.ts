import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SearchFilterService } from '../services/search-filter.service';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { ImageService } from '../services/image.service';
import { User, Category, Item } from '../interface/interfaces';


@Component({
  selector: 'app-homepage-products',
  templateUrl: './homepage-products.component.html',
  styleUrls: ['./homepage-products.component.css']
})
export class HomepageProductsComponent implements OnInit {

  constructor(private snackbar: MatSnackBar, private router: Router,
    private searchfilterService: SearchFilterService,
    private changeDetectorRef: ChangeDetectorRef,
    private categoryService: CategoryService,
    private itemService: ItemService,
    private imageService: ImageService) {

  }
  searchText: string = ''; /*cuva vrijednost koju korisnik unese */
  isSearchActive: boolean = false;
  isChipsActive: boolean = false;

  allItems: Item[] = [];
  items: Item[] = [];
  pageSlice = this.items.slice(0, 8);

  ngOnInit(): void {
    this.paginator.pageSize = 8;

    //dobavljanje svih artikala iz baze
    this.itemService.getAllItems().subscribe(
      items => {

        for (let item of items) {
          this.imageService.getImagesForItem(item.id).subscribe(
            data => {
              item.images = data;
              let s = JSON.stringify(data);
              item.images = JSON.parse(s).images;

              this.allItems = items.sort((a: Item, b: Item) => new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime());
              this.items = this.allItems;

              console.log("ognje" + JSON.parse(s).images);

              this.pageSlice = this.items.slice(0, 8);
            }
          )
        }
      }
    );

    //dobavljanje svih kategorija iz baze
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.categories = categories;
        //console.log(categories);
      }
    );

    //pretplata na promjene u search boxu
    this.searchfilterService.enteredSearchText.subscribe((value) => {
      this.searchText = value;

      if (this.searchText !== '') {
        this.isSearchActive = true;
        console.log("postavljen isSearcActive na true");
      } else {
        this.isSearchActive = false;
        console.log("postavljen isSearcActive na false");
      }

      if (this.isChipsActive) {
        this.items = (this.allItems.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase())))
          .filter(item => item.category.name === this.selectedCategory);
      } else {
        this.items = this.allItems.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
      }

      this.changeDetectorRef.markForCheck(); //trigeruje change detection
      this.modifyPaginator();
    })

    //pretpalata na ona cekiranja mat chips
    this.searchfilterService.chipsCategoryFilter.subscribe((value) => {
      if (this.selectedCategory === value) {
        this.deselectCategory();
        this.isChipsActive = false;
      } else {
        this.selectedCategory = value;
        if (this.isSearchActive) {
          this.items = (this.allItems.filter(item => item.category.name === this.selectedCategory))
            .filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
        } else {
          this.items = this.allItems.filter(item => item.category.name === this.selectedCategory);
        }

        this.isChipsActive = true;

        this.changeDetectorRef.markForCheck();
        this.modifyPaginator();
      }
    })

    //pretplata na komponentu za filtriranje elemenata
    this.searchfilterService.itemsFilering.subscribe((filteredItems) => {
      this.items = filteredItems;
      this.changeDetectorRef.markForCheck();
      this.modifyPaginator();
    })

    //za podesavanje paginatora
    this.paginator._intl.nextPageLabel = "Naredna stranica";
    this.paginator._intl.firstPageLabel = "Prva stranica";
    this.paginator._intl.previousPageLabel = "Prethodna stranica";
    this.paginator._intl.lastPageLabel = "Posljednja stranica";
    this.paginator._intl.itemsPerPageLabel = "Broj artikala po stranici:";
  }



  //za mat chips
  selectedCategory: string = '';
  categories: Category[] = []; //lista u koju ce se ucitati kategorije iz baze
  selectCategory(category: string) {
    this.searchfilterService.onSelectCategoryChip(category);
  }

  deselectCategory() {
    this.selectedCategory = '';
    if (this.isSearchActive) {
      console.log("ovde sam " + this.searchText);
      this.items = this.allItems.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      this.items = this.allItems;
    }
    this.changeDetectorRef.markForCheck();
    this.modifyPaginator();
  }


  /*
    items = [
      {
        "id": "1",
        "title": "Samsung Galaxy A4",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Telefoni",
        "price": 1600,
        "status": "Novo",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      },
      {
        "id": "2",
        "title": "Huawei Mate 10 Lite",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Telefoni",
        "price": 500,
        "status": "Novo",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      },
      {
        "id": "3",
        "title": "Opel Corsa",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Automobili",
        "price": 1200,
        "status": "Novo",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      },
      {
        "id": "4",
        "title": "Samsung Televizor",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Televizor",
        "price": 1200,
        "status": "Korišteno",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      },
      {
        "id": "5",
        "title": "Samsung Galaxy A4",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Telefoni",
        "price": 1200,
        "status": "Novo",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      },
      {
        "id": "6",
        "title": "Huawei Mate 10 Lite",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Telefoni",
        "price": 1200,
        "status": "Korišteno",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      },
      {
        "id": "7",
        "title": "Opel Corsa",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Automobili",
        "price": 1200,
        "status": "Novo",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      },
      {
        "id": "8",
        "title": "Samsung Televizor",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Televizor",
        "price": 1200,
        "status": "Novo",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      }
    ];
  
    
    allItems = [
      {
        "id": "1",
        "title": "Samsung Galaxy A4",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Telefoni",
        "price": 1600,
        "status": "Novo",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      },
      {
        "id": "2",
        "title": "Huawei Mate 10 Lite",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Telefoni",
        "price": 500,
        "status": "Novo",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      },
      {
        "id": "3",
        "title": "Opel Corsa",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Automobili",
        "price": 1200,
        "status": "Novo",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      },
      {
        "id": "4",
        "title": "Samsung Televizor",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Televizor",
        "price": 1200,
        "status": "Korišteno",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      },
      {
        "id": "5",
        "title": "Samsung Galaxy A4",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Telefoni",
        "price": 1200,
        "status": "Novo",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      },
      {
        "id": "6",
        "title": "Huawei Mate 10 Lite",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Telefoni",
        "price": 1200,
        "status": "Korišteno",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      },
      {
        "id": "7",
        "title": "Opel Corsa",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Automobili",
        "price": 1200,
        "status": "Novo",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      },
      {
        "id": "8",
        "title": "Samsung Televizor",
        "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
        "category": "Televizor",
        "price": 1200,
        "status": "Novo",
        "location": "Banja Luka",
        "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
        "seller": "marko123",
        "contact": "065/215-963"
      }
    ];
  */

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  /* za paginator */
  onPageChange(event: PageEvent) {
    console.log("***" + this.pageSlice);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.items.length) {
      endIndex = this.items.length;
    }
    this.pageSlice = this.items.slice(startIndex, endIndex);
  }

  modifyPaginator() {
    let endIndex = this.paginator.pageSize;
    if (endIndex > this.items.length) {
      endIndex = this.items.length;
    }
    this.pageSlice = this.items.slice(0, endIndex);
  }

}
