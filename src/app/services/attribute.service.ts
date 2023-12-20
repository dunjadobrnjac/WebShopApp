import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private baseUrl = 'http://localhost:8080/attribute';
  constructor(private httpClient: HttpClient) { }

  public getItemAttributes(id: number) {
    const url = `${this.baseUrl}/item/${id}`;
    return this.httpClient.get<any>(url);
  }

  public getCategoryAttributes(id: number) {
    const url = `${this.baseUrl}/category/${id}`;
    return this.httpClient.get<any>(url);
  }

  public addNewItemAttribute(object: any){
    const url = `${this.baseUrl}/new`;
    return this.httpClient.post(url, object)
  }
}
