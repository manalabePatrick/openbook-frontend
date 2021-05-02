import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-book-notes',
  templateUrl: './book-notes.page.html',
  styleUrls: ['./book-notes.page.scss'],
})
export class BookNotesPage implements OnInit {

  by = '';
  title = '';
  canPost: any;
  bookId: any;
  userId: any;
  posts = [];
  public post = {
    content: '',
    bookId: ''
  }
  constructor(private alertController: AlertController, private storage: LocalStorageService, private apiService:ApiService) { 
    this.post.bookId = this.storage.bookId;
    this.userId = this.storage.userId;
    this.bookId = this.storage.bookId;
    this.posts = this.storage.libraryPost;
    this.canPost = this.storage.canPost;
    this.title = this.storage.bookTitle;
    this.by = this.storage.by;
  }

  ngOnInit() {
    this.showPosts();
  }

  public showPosts(){
    if(!this.storage.fromLibrary){
      // console.log(this.storage.libraryChapters);
       return this.storage.fromLibrary = false;
     }
    let requestObject = {
      location: `users/get-user-data/${this.userId}`,
      method: "GET"
  }

  this.apiService.makeRequest(requestObject).then((data) => {
    this.posts = data.user.posts
  });
  }

  public createPost(){
    if(!this.post.content){
      return this.presentAlert("You need to add something!")
    }

    let requestObject = {
      location: "users/create-post",
      method: "POST",
      body: this.post
    }

    this.apiService.makeRequest(requestObject).then((val) => {
      if(val.statusCode == 201) {
          this.posts.push(val.newPost);
          this.post.content = '';
      } else {
          console.log("Something went wrong, your post could not be created.");
      }
  });
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
