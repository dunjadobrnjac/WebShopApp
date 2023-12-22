import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserWithPin, UsernamePassword } from '../interface/interfaces'


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = 'http://localhost:8080/registration';
  constructor(private httpClient: HttpClient) { }

  public registerUser(user: any): any {
    const url = `${this.baseUrl}/register`;
    return this.httpClient.post(url, user);
  }

  public checkPin(user: UserWithPin, pin: string) {
    const url = `${this.baseUrl}/checkpin`;
    let data = { user, pin };
    const body = JSON.stringify(data);
    return this.httpClient.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  public loginUser(username: string, password: string, pin: string): any {
    const url = `${this.baseUrl}/login`;
    const data: UsernamePassword = { username: username, password: password, pin: pin }
    return this.httpClient.post(url, data);
  }

}
