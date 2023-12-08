import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PurchasesService {

  private baseUrl = 'http://localhost:8080/purchases';

  constructor(private httpClient: HttpClient) { }

  public getAllPurchasesForUser(userId: number): Observable<Object[]> {
    const url = `${this.baseUrl}/${userId}`;
    return this.httpClient.get<Object[]>(url);
  }
}
