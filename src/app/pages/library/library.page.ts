import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  books = [];
  organizedBook = [];
  chapters = [];
  organizedChapters = [];
  constructor(private apiService: ApiService, private storage: LocalStorageService, private router: Router) { }

  ngOnInit() {
    this.showBooks();
  }

  public organizeBooks(){
    this.books.forEach((val) =>{
      val.books.forEach(book =>{
        this.organizedBook.push(book);
      })
    });
    //console.log(this.organizedBook);
  }

  public organizeChapters(){
    this.chapters.forEach((val) =>{
      val.chapters.forEach(book =>{
        this.organizedChapters.push(book);
      })
    });
    //console.log(this.organizedChapters);
  }

  public showBooks(){
    let requestObject = {
      location: 'users/get-all-data',
      method: "GET"
  }

  this.apiService.makeRequest(requestObject).then((data) => {
    this.books = data;
    this.chapters = data;
    this.organizeBooks();
    this.organizeChapters();
    //console.log(this.books);
  });
  }

  public viewBook(id){
    this.storage.bookId = id;
    this.storage.fromLibrary = true;
    this.storage.libraryChapters = this.organizedChapters;
    this.router.navigate(['/view-book']);
  }

}
