import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  avatar:string = "2";
  name:string ="sample Name";
  email:string = "sampleNaMalupit@gmail.com";
  user:any;
  public appPages = [
    { title: 'Library', url: '/library', icon: 'book' },
    { title: 'My Books', url: '/my-books', icon: 'archive' },
    { title: 'Letters', url: '/letters', icon: 'document' },
    { title: 'Diary', url: '/diary', icon: 'reader' },
    { title: 'Leave', url: '/login', icon: 'log-out' },
  ];
  constructor(private storage: LocalStorageService) {
    
  }

  chaneInfo(){
    this.user = this.storage.user;
    this.name = this.user.name;
    this.email = this.user.email;
    this.avatar = this.user.avatar;
  }
}
