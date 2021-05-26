import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-post-chapter',
  templateUrl: './post-chapter.page.html',
  styleUrls: ['./post-chapter.page.scss'],
})
export class PostChapterPage implements OnInit {

  public chapter = {
    title: '',
    content: '',
    bookId: '',
    genre: ''
  }

  constructor(private storage: LocalStorageService, private alertController: AlertController, private modalController: ModalController, private apiService: ApiService) {
    this.chapter.bookId = this.storage.bookId;
   }

  ngOnInit() {
  }

  public addChapter(){
    if(!this.chapter.title || !this.chapter.content){
      const err = this.presentAlert('All fields are required');
      return err
    }

    let requestObject = {
      location: "users/create-chapter",
      method: "POST",
      body: this.chapter
    }

    this.apiService.makeRequest(requestObject).then((val) => {
      if(val.statusCode == 201) {
          this.storage.didPost = true;
          this.modalController.dismiss(val.newPost);
         // console.log(val.newPost.bookId[0]);
      } else {
          console.log("Something went wrong, your chapter could not be created.");
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
