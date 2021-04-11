import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostBookPage } from 'src/app/modals/post-book/post-book.page';


@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.page.html',
  styleUrls: ['./my-books.page.scss'],
})
export class MyBooksPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PostBookPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
