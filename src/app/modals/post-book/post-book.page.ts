import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-post-book',
  templateUrl: './post-book.page.html',
  styleUrls: ['./post-book.page.scss'],
})
export class PostBookPage implements OnInit {

  genre:any;
  public book = {
    title: '',
    summary: '',
    by: '',
    genre:''
  }
  constructor(private router: Router, private modalController:ModalController, private alertController: AlertController, private apiService: ApiService, private storage: LocalStorageService){ 
    this.book.by = this.storage.userName;
  }

  ngOnInit() {
  }

  public addBook(){
    if(!this.book.title || !this.book.summary){
      const err = this.presentAlert('All fields are required');
      return err
    }

    this.book.genre = this.genre;
    let requestObject = {
      location: "users/create-book",
      method: "POST",
      body: this.book
    }

    this.apiService.makeRequest(requestObject).then((val) => {
      if(val.statusCode == 201) {
          val.newPost.ago = "Now";
          this.storage.didPost = true;
          this.modalController.dismiss(val.newPost);
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

  public closeModal(){
    this.modalController.dismiss();
  }

}
