import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
export class ItemService {

  private baseUrl = 'http://localhost:8080/item';
  constructor(private httpClient: HttpClient) { }

  public getAllItems() {
    const url = `${this.baseUrl}/items`;
    return this.httpClient.get<any>(url);
  }

  public getAllItemLocations() {
    const url = `${this.baseUrl}/locations`;
    return this.httpClient.get<any>(url);
  }

  public getItemById(id: number): Observable<Item> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Item>(url);
  }

  public updateItemAvailability(itemId: number): Observable<any> {
    const url = `${this.baseUrl}/${itemId}/update`;
    return this.httpClient.put(url, {}); //{} jer se status postavlja fiksno na 0
  }

}
