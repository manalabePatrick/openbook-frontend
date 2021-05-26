import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  user:any;
  by = '';
  bookTitle = '';
  userName = '';
  canPost = false;
  libraryPost = [];
  libraryChapters = [];
  fromLibrary = false;
  userId:any;
  tokenName = "--token-ASM-PROD";
  postThemeName = "--post-theme-ASM-PROD";
  didPost = false;
  bookId = "";
  pages=[];
  pageNum;
  author: any;
  data:any;

  private set(key, value) {
      if(localStorage) {
          localStorage.setItem(key, value);
      } else {
          alert('Browser does not support the localStorage API');
      }
  }

  public setUserId(id) {
    return this.userId = id;
}
  
  private get(key) {
      if(localStorage) {
          if(key in localStorage){
              return localStorage.getItem(key);
          }
      } else {
          alert('Browser does not support the localStorage API');
      }
  }
  
  public setToken(token) {
      this.set(this.tokenName, token);
  }
  
  public getToken() {
      return this.get(this.tokenName);
  }
  
  public getParsedToken() {
      let token = this.getToken();
      return JSON.parse(atob(token.split(".")[1]));
  }
  
  public removeToken() {
      localStorage.removeItem(this.tokenName);
  }
  
  public setPostTheme(theme) {
      this.set(this.postThemeName, theme);
  }
  
  public getPostTheme() {
      return this.get(this.postThemeName);
  }
}
