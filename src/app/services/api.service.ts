import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public makeRequest(requestObject):any{
    const method = requestObject.method.toLowerCase();
    const body = requestObject.body || {};
    const location = requestObject.location;

    const url = `${this.baseURL}/${location}`;
    let httpOptions = {};

    if(method ==="post"){
      return this.http.post(url, body, httpOptions).toPromise();
    }
  }
}
