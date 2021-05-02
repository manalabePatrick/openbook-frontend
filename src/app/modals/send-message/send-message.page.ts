import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.page.html',
  styleUrls: ['./send-message.page.scss'],
})
export class SendMessagePage implements OnInit {

  to = '';
  data = []
  public book = {
    my_id: 'sample',
    content: '',
    other_id: 'sample',
    from: 'wew',
    to: 'wew',
  }
  constructor(private modalController: ModalController, private storage: LocalStorageService, private alertController: AlertController, private apiService: ApiService) { 
    this.data = this.storage.data;
    this.book.my_id = this.storage.userId;
    this.book.other_id = this.storage.author;
    this.book.from = this.storage.userName;
  }

  ngOnInit() {
    this.setInfo();
  }

  public setInfo(){
    this.data.forEach(element => {
      if(element._id == this.storage.author){
        this.to = element.name;
        this.book.to = this.to;
      }
    });
  }
  public sendLetter(){
    if(!this.book.content){
      const err = this.presentAlert('All fields are required');
      return err
    }

    let requestObject = {
      location: "users/create-message",
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

  public closeModal(){
    this.modalController.dismiss();
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
