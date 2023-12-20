import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/category';

  constructor(private httpClient: HttpClient) { }

  public getAllCategories() {
    const url = `${this.baseUrl}/categories`;
    return this.httpClient.get<any>(url);
  }

  public getCategoryById(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<any>(url);
  }
}
