import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Library', url: '/folder/Inbox', icon: 'book' },
    { title: 'Book Shelf', url: '/folder/Outbox', icon: 'layers' },
    { title: 'My Books', url: '/my-books', icon: 'archive' },
    { title: 'Letters', url: '/folder/Archived', icon: 'document' },
    { title: 'Diary', url: '/folder/Trash', icon: 'reader' },
    { title: 'Leave', url: '/login', icon: 'log-out' },
  ];
  constructor() {}
}
