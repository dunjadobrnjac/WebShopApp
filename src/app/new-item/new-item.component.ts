import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  newItemForm!: FormGroup; /*forma dodavanje novog artikla */
  //objekat za unos
  newItem!: Item;
  itemState: string = ""; //bice paadjuci pa vidjeti sta i kako


  ngOnInit(): void {
    /*validacija kod promjene lozinke */

    this.newItemForm = this.formBuilder.group({
      infoControl: ['', [Validators.required]],
    })
  }

  //klik na dugme za dodavanje
  onAddNewItem() {
    console.log(this.newItem);
  }

}
