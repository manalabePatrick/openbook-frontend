import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.page.html',
  styleUrls: ['./letters.page.scss'],
})
export class LettersPage implements OnInit {

  messages = [];
  data = [];
  constructor(private storage: LocalStorageService, private alertController: AlertController) { 
    this.data = this.storage.data;
  }

  ionViewWillEnter(){
    this.setMessages();
  }

  ngOnInit() {
    this.setMessages();
  }

  public setMessages(){
    this.data.forEach(element => {
      if(element._id == this.storage.userId){
        this.messages = element.messages;
      }
    });
  }

  async presentAlertConfirm(msg, from) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'From: '+ from,
      message: 'Message: <strong>'+ msg +'</strong>',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Closed');
          }
        }, {
          text: 'Reply',
          handler: () => {
            console.log('Gonna Repply');
          }
        }
      ]
    });

    await alert.present();
  }

}
