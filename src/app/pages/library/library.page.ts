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
  post = [];
  organizedPosts = [];
  constructor(private apiService: ApiService, private storage: LocalStorageService, private router: Router) { 
    this.storage.canPost = false;
  }

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

  public organizePost(){
    this.post.forEach((val) =>{
      val.posts.forEach(post =>{
        this.organizedPosts.push(post);
      })
    });
  }

  public organizeChapters(){
    this.chapters.forEach((val) =>{
      val.chapters.forEach(book =>{
        this.organizedChapters.push(book);
      })
    });
    //console.log(this.organizedChapters);
  }

  public open(){
    console.log(this.organizedPosts);
  }

  public showBooks(){
    let requestObject = {
      location: 'users/get-all-data',
      method: "GET"
  }

  this.apiService.makeRequest(requestObject).then((data) => {
    this.books = data;
    this.chapters = data;
    this.post = data;
    this.organizeBooks();
    this.organizeChapters();
    this.organizePost();
    //console.log(this.books);
  });
  }

  public viewBook(id){
    this.storage.bookId = id;
    this.storage.fromLibrary = true;
    this.storage.libraryChapters = this.organizedChapters;
    this.storage.libraryPost = this.organizedPosts;
    this.router.navigate(['/view-book']);
  }

}
