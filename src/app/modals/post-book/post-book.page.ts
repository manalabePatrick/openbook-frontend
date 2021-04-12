import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-post-book',
  templateUrl: './post-book.page.html',
  styleUrls: ['./post-book.page.scss'],
})
export class PostBookPage implements OnInit {

  public book = {
    content: '',
    theme: ''
  }

  constructor(private modalController:ModalController, private alertController: AlertController, private apiService: ApiService){ }

  ngOnInit() {
  }

  public addBook(){
    if(!this.book.content || !this.book.theme){
      const err = this.presentAlert('All fields are required');
      return err
    }

    let requestObject = {
      location: "users/create-post",
      method: "POST",
      body: this.book
    }

    this.apiService.makeRequest(requestObject).then((val) => {
      if(val.statusCode == 201) {
          val.newPost.ago = "Now";
          console.log("201")
      } else {
          console.log("Something went wrong, your post could not be created.");
      }
      this.book.content = "";
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
s
  public closeModal(){
    this.modalController.dismiss();
  }

}
