import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostChapterPage } from 'src/app/modals/post-chapter/post-chapter.page';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-book-chapters',
  templateUrl: './book-chapters.page.html',
  styleUrls: ['./book-chapters.page.scss'],
})
export class BookChaptersPage implements OnInit {

  userId: any;
  bookId = '';
  chapters = []
  constructor(private modalController: ModalController, private apiService: ApiService, private storage: LocalStorageService) {
    this.userId = this.storage.userId;
    this.bookId = this.storage.bookId; 
   }

  ngOnInit() {
    this.showChapters();
  }

  public showChapters(){
    let requestObject = {
      location: `users/get-user-data/${this.userId}`,
      method: "GET"
  }

  this.apiService.makeRequest(requestObject).then((data) => {
    this.chapters = data.user.chapters
  });
  }

  public createChapter(){
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PostChapterPage,
      cssClass: 'my-custom-class'
    });
    
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if(this.storage.didPost){
      this.chapters.push(data);
      this.storage.didPost = false;
    }
    
  }

}
