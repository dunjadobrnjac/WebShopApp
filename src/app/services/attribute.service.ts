import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private baseUrl = 'http://localhost:8080/attribute/item';
  constructor(private httpClient: HttpClient) { }

  public getItemAttributes(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<any>(url);
  }
}
