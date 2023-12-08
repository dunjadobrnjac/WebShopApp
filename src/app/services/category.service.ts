import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = 'http://localhost:8080/category/categories';

  constructor(private httpClient: HttpClient) { }

  public getAllCategories() {
    return this.httpClient.get<any>(this.url);
  }
}
