import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/user';
  constructor(private httpClient: HttpClient) { }

  getUserById(userId: number): Observable<any> {
    const url = `${this.baseUrl}/${userId}`;
    return this.httpClient.get<any>(url);
  }

  updateUser(user: any) {
    const url = `${this.baseUrl}/update`;
    return this.httpClient.post(url, user);
  }

  updatePassword(id: number, oldPassword: string, newPassword: string) {
    const url = `${this.baseUrl}/pass/${id}`;
    let data: UpdatePasswordData = { oldPassword, newPassword };
    const body = JSON.stringify(data);
    return this.httpClient.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

}
