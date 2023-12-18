import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = 'http://localhost:8080/message';
  constructor(private httpClient: HttpClient) { }

  addNewMessage(message: any): Observable<number> {
    const url = `${this.baseUrl}/add`;
    console.log(message);
    return this.httpClient.post<number>(url, message);
  }

  getUserMessages(userId: number): Observable<any> {
    const url = `${this.baseUrl}/${userId}`;
    return this.httpClient.get(url);
  }
}
