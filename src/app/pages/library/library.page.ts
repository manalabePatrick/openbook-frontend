import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  // <ion-card *ngFor="let book of organizedBook" (click)="viewBook(book._id)">
  //   <img
  //     src="https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  //   />
  //   <ion-card-header>
  //     <ion-card-subtitle>Title</ion-card-subtitle>
  //     <ion-card-title>{{ book.title }}</ion-card-title>
  //   </ion-card-header>
  //   <ion-card-content>{{ book.content }}</ion-card-content>
  //   <ion-button shape="round" color="warning"> Stars</ion-button>
  //   <ion-button shape="round" color="success"> Views</ion-button>
  //   <ion-button shape="round"> Notes</ion-button>
  // </ion-card>

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

  async presentAlert(title, summary, by) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      subHeader: 'by: ' + by,
      message: summary,
      buttons: ['OK']
    });

    await alert.present();

    // const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

}
