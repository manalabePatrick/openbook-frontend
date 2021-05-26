import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.page.html',
  styleUrls: ['./avatars.page.scss'],
})
export class AvatarsPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  chooseAvatar(num){
    this.modalController.dismiss(num);
  }

}
