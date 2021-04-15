import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  books = [];
  organizedBook = [];
  constructor(private apiService: ApiService) { }

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

  public showBooks(){
    let requestObject = {
      location: 'users/get-all-data',
      method: "GET"
  }

  this.apiService.makeRequest(requestObject).then((data) => {
    this.books = data;
    this.organizeBooks();
    //console.log(this.books);
  });
  }

}
