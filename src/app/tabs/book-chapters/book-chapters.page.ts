import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PostChapterPage } from 'src/app/modals/post-chapter/post-chapter.page';
import { SendMessagePage } from 'src/app/modals/send-message/send-message.page';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-book-chapters',
  templateUrl: './book-chapters.page.html',
  styleUrls: ['./book-chapters.page.scss'],
})
export class BookChaptersPage implements OnInit {

  by = '';
  title = '';
  added:boolean = false;
  canPost: any;
  userId: any;
  bookId = '';
  chapters = []
  pages = [];
  public favorite = {
    bookId:this.storage.bookId
  }
  constructor(private modalController: ModalController, private apiService: ApiService, private storage: LocalStorageService, private router: Router) {
    this.userId = this.storage.userId;
    this.bookId = this.storage.bookId; 
    this.chapters = this.storage.libraryChapters;
    this.canPost = this.storage.canPost;
    this.title = this.storage.bookTitle;
    this.by = this.storage.by;
   }

  ngOnInit() {
    this.showChapters();
  }

  public sendLetter(){
    // console.log(this.storage.userId);
    // console.log(this.storage.author);
    this.messageModal();
  }

  public viewChapter(i){
    this.chapters.forEach(element => {
      if(element.bookId == this.bookId){
        this.pages.push(element)
      }
    });

    this.storage.pages = this.pages;
    this.storage.pageNum= i;
    this.router.navigate(['/read']);
  }
  public showChapters(){

    if(this.storage.fromLibrary){
     // console.log(this.storage.libraryChapters);
      return this.storage.fromLibrary = false;
    }
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

  async messageModal() {
    const modal = await this.modalController.create({
      component: SendMessagePage,
      cssClass: 'my-custom-class'
    });
    
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if(this.storage.didPost){
      this.chapters.push(data);
      this.storage.didPost = false;
    }
    
  }

  public addToFavorite(){
    console.log(this.storage.bookId)
   if(this.added){
      let requestObject = {
        location: "users/favorite",
        method: "POST",
        body: this.favorite
      }

      this.apiService.makeRequest(requestObject).then((val) => {
        if(val.statusCode == 201) {
            console.log('added')
        } else {
            console.log("Something went wrong, your chapter could not be created.");
        }
    });
   }else{
     console.log("removed");
   }
  }
}
