import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl = 'http://localhost:8080/item';
  constructor(private httpClient: HttpClient) { }

  //dobavljanje svih artikala
  public getAllItems() {
    const url = `${this.baseUrl}/items`;
    return this.httpClient.get<any>(url);
  }

  //dobavljanje lokacija na kojima postoje artikli
  public getAllItemLocations() {
    const url = `${this.baseUrl}/locations`;
    return this.httpClient.get<any>(url);
  }

  //dobavljanje artikala na osnovu id
  public getItemById(id: number): Observable<Item> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Item>(url);
  }

  //dobavljanje activnih oglasa korisnika
  public getActiveItems(userId: number) {
    const url = `${this.baseUrl}/active/${userId}`;
    return this.httpClient.get<Item[]>(url);
  }

  //dobavljanje zavsenih oglasa korisnika
  public getFinishedItems(userId: number) {
    const url = `${this.baseUrl}/finished/${userId}`;
    return this.httpClient.get<Item[]>(url);
  }

  //postavljenja na 0 nakon kupovine
  public updateItemAvailability(itemId: number): Observable<any> {
    const url = `${this.baseUrl}/${itemId}/update`;
    return this.httpClient.put(url, {}); //{} jer se status postavlja fiksno na 0
  }

  //brisanje oglasa
  public deleteItem(itemId: number) {
    const url = `${this.baseUrl}/${itemId}/delete`;
    return this.httpClient.put(url, {});
  }

  //dodavanje novog artikla
  public addNewItem(item: any) {
    const url = `${this.baseUrl}/new`;
    return this.httpClient.post(url, item);
  }

}
