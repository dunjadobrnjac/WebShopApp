import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
}

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  //deletedItemSubject = new Subject<Item>();
  //addedItemSubject = new Subject<Item>();
}
