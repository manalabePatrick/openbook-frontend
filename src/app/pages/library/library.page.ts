import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { element } from 'protractor';
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
  constructor(private apiService: ApiService, private storage: LocalStorageService, private router: Router, private alertController: AlertController) { 
    this.storage.canPost = false;
  }

  ngOnInit() {
    this.showBooks();
  }

  public search(evnt){

    const result = this.organizedBook.find( ({ title }) => title.toLowerCase() === evnt.detail.value.toLowerCase() );
    if(result){
      this.organizedBook = [];
      this.organizedBook.push(result);
    }
  }

  public clearSearch(){
    this.showBooks();
  }

  public showSummary(title, summary, by){
    this.presentAlert(title, summary, by);
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
    this.storage.data = data;
    //console.log(this.books);
  });
  }

  public viewBook(id, title, by, owner_id ){
    this.storage.bookId = id;
    this.storage.fromLibrary = true;
    this.storage.libraryChapters = this.organizedChapters;
    this.storage.libraryPost = this.organizedPosts;
    this.storage.bookTitle = title;
    this.storage.by = by;
    this.storage.author = owner_id;
    this.router.navigate(['/view-book']);
  }


  async presentAlert(title, summary, by) {
    const alert = await this.alertController.create({
      cssClass: 'ion-text-justify',
      header:"Title: " + title,
      subHeader: 'by: ' + by,
      message: "summary: "+ summary,
      buttons: ['OK']
    });

    await alert.present();

     
    // const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

}
