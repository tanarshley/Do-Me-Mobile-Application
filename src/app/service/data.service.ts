import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private link = 'http://localhost/do-me-api/';

  constructor(private http: HttpClient) {
    console.log('Data Service is working');
  }

  request(endpoint, data) {
    return this.http.post(this.link + endpoint, JSON.stringify(data));
  }
}
