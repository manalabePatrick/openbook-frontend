import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {

  userId:String;
  name:String = "Sample Name";
  email:String = "sample@gmail.com";
  books:number = 0;
  avatar:string = '2';
  chapters:number = 0;
  constructor(private storage: LocalStorageService, private apiService: ApiService) {
    this.userId = this.storage.userId;
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUserData();
  }

  getUserData(){
    let requestObject = {
      location: `users/get-user-data/${this.userId}`,
      method: "GET"
    }

    this.apiService.makeRequest(requestObject).then((data) => {
      this.name = data.user.name;
      this.email = data.user.email;
      this.books = data.user.books.length;
      this.chapters = data.user.chapters.length;
    });
  }

}
