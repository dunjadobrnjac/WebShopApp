import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'http://localhost:4000';

  public storeImagesForItem(formData: FormData, id: number) {
    const url = `${this.baseUrl}/images/${id}`;
    return this.httpClient.post(url, formData)
  }

  public getImagesForItem(id: number) {
    const url = `${this.baseUrl}/getImages/${id}`;
    return this.httpClient.get<string[]>(url);
  }
}
