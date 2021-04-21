import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PostBookPage } from 'src/app/modals/post-book/post-book.page';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.page.html',
  styleUrls: ['./my-books.page.scss'],
})
export class MyBooksPage implements OnInit {

  userId: any;
  books = [{
    _id: '1',
    title: 'Default',
    summary: 'Default'
  }]
  constructor(private modalController: ModalController, private storage: LocalStorageService, private apiService: ApiService, private router: Router) { 
    this.userId = this.storage.userId;
    this.storage.canPost = true;
  }

  ngOnInit() {
    // console.log(this.userId);
    this.showUserBooks();
  }

  public showUserBooks(){
    let requestObject = {
      location: `users/get-user-data/${this.userId}`,
      method: "GET"
  }

  this.apiService.makeRequest(requestObject).then((data) => {
    this.books = data.user.books
  });
  }


  public viewBook(id){
    this.storage.bookId = id;
    this.router.navigate(['/view-book']);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PostBookPage,
      cssClass: 'my-custom-class'
    });
    
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if(this.storage.didPost){
      this.books.push(data);
      this.storage.didPost = false;
    }
    
  }

}
