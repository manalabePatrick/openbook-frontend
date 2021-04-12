import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  public makeRequest(requestObject):any{
    const method = requestObject.method.toLowerCase();
    const body = requestObject.body || {};
    const location = requestObject.location;

    const url = `${this.baseURL}/${location}`;
    let httpOptions = {}; 

    if(this.storage.getToken()) {
      httpOptions = {
          headers: new HttpHeaders({
              'Authorization': `Bearer ${this.storage.getToken()}`
          })
      }
  }

    if(method ==="post"){
      return this.http.post(url, body, httpOptions).toPromise();
    }
  }
}
