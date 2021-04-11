import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-post-book',
  templateUrl: './post-book.page.html',
  styleUrls: ['./post-book.page.scss'],
})
export class PostBookPage implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {
  }

  public addBook(){
    this.modalController.dismiss();
  }

}
