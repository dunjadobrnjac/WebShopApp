import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { AttributeService } from '../services/attribute.service';
import { ItemService } from '../services/item.service';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from '../services/image.service';
import { map } from 'rxjs';
import { User, Category, Attr, Attribute } from '../interface/interfaces';


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
}

interface ItemObject {
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
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private attributeService: AttributeService,
    private itemService: ItemService,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private imageService: ImageService) {
  }

  @ViewChild('imageInput') imageInput!: ElementRef;
  newItemForm!: FormGroup; /*forma dodavanje novog artikla */
  //objekat za unos
  newItem: Item = {
    id: -1,
    name: "",
    description: "",
    price: "",
    location: "",
    status: -1,
    available: 1,
    creation_date: new Date(),
    user_id: -1,
    category_id: -1,
  };

  categories: Category[] = [];
  attributes: Attribute[] = [];
  newItemAttributes: Attr[] = [];

  newItemIdForImages!: number;

  itemObject!: ItemObject;

  ngOnInit(): void {
    /*validacija kod promjene lozinke */
    this.newItemForm = this.formBuilder.group({
      nameControl: ['', [Validators.required]],
      descriptionControl: ['', [Validators.required]],
      priceControl: ['', [Validators.required]],
      locationControl: ['', [Validators.required]],
      statusControl: ['', [Validators.required]],
      categoryControl: ['', [Validators.required]],
      infoControl: ['', [Validators.required]],
    })

    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.categories = categories;
      }
    );
  }

  //klik na dugme za dodavanje
  onAddNewItem() {
    console.log(this.newItem);
    console.log("category--> " + this.newItem.category_id);
    //provjera za kategoriju i status jer je dropdown meni
    if (this.newItem.category_id == -1) {
      this.newItemForm.controls['categoryControl'].setErrors(Validators.required);
    }
    if (this.newItem.status == -1) {
      this.newItemForm.controls['statusControl'].setErrors(Validators.required);
    }

    //  console.log(this.newItemAttributes);
    //provjera da li su unesene vrijednosti za dodatne atribute
    for (let attr of this.newItemAttributes) {
      if (attr.value == "") {
        this.newItemForm.controls['infoControl'].setErrors(Validators.required);
      }
    }

    console.log(this.newItemForm.valid);
    if (this.newItemForm.valid) {
      console.log("*");
      //sad kad je sve uneseno
      //kreira novi artikal u tabeli item
      let selectedCategory: Category;
      let currentUser: User;

      const ls = localStorage.getItem("activeUserId");
      const activeUserId = ls != null ? parseInt(ls, 10) : 0;
      this.userService.getUserById(activeUserId).subscribe( //ovde treba id trenutnog korisnika
        u => {
          currentUser = u;
          console.log("user -->" + currentUser.username);
          console.log("category --> " + this.newItem.category_id);

          this.categoryService.getCategoryById(this.newItem.category_id).subscribe(
            cat => {
              selectedCategory = cat;
              console.log("category ->" + selectedCategory.name);

              this.itemObject = {
                name: this.newItem.name,
                description: this.newItem.description,
                price: this.newItem.price,
                location: this.newItem.location,
                status: this.newItem.status,
                available: this.newItem.available,
                creation_date: new Date(),
                user: currentUser,
                category: selectedCategory
              }


              this.itemService.addNewItem(this.itemObject)
                .pipe(
                  map(item => { return item as Item })
                ).subscribe(
                  response => {
                    console.log(response); //vrati kreirani objekat
                    //ako je kreiran , ispisati snack poruku i obrisati sadrzaj forme
                    if (response != null) {
                      this.newItemIdForImages = response.id;
                    }

                    //popunjava item_attribute tabelu sa vrijednostima

                    for (let attr of this.newItemAttributes) {
                      attr.item = response;
                    }
                    console.log(this.newItemAttributes);

                    this.attributeService.addNewItemAttribute(this.newItemAttributes).subscribe(
                      response => {
                        console.log(response);
                        if (response != null) {
                          this.snackbar.open("Uspješno ste dodali novi oglas.", "",
                            {
                              duration: 4000,
                              horizontalPosition: 'center',
                              verticalPosition: 'top'
                            }
                          )
                        } else {
                          this.snackbar.open("Dodavanje novog oglasa nije uspjelo. Poušajte kasnije ponovo.", "",
                            {
                              duration: 4000,
                              horizontalPosition: 'center',
                              verticalPosition: 'top'
                            }
                          )
                        }

                        // this.newItemForm.reset();
                        // this.newItemForm.markAsPristine();
                        // this.newItemForm.markAsUntouched();
                        window.location.reload();
                      }

                    );
                    if (this.selectedFiles && this.selectedFiles.length > 0) {
                      const formData = new FormData();

                      for (let i = 0; i < this.selectedFiles.length; i++) {
                        formData.append('slika', this.selectedFiles[i])
                      }

                      console.log("id" + this.newItemIdForImages);

                      this.imageService.storeImagesForItem(formData, this.newItemIdForImages).subscribe(
                        response => {
                          console.log("Images " + response);
                        }
                      );
                    }
                  }
                );
            }
          );
        }
      );
    }

  }

  onCategoryChanged(event: any) {
    console.log(event.value);
    this.newItem.category_id = event.value;
    this.newItemAttributes = [];

    this.attributeService.getCategoryAttributes(this.newItem.category_id).subscribe(
      attr => {
        this.attributes = attr;
        for (const a of attr) {
          this.newItemAttributes.push({ item: null, attribute: a, value: "" });
          console.log("category--> " + this.newItem.category_id);
        }
      }
    );
  }

  selectedFiles!: FileList;
  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    console.log("files ->" + this.selectedFiles);
    console.log("category--> " + this.newItem.category_id);
  }

}
