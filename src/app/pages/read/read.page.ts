import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage implements OnInit {

  title = 'default';
  body = 'default';
  pages = [];
  pageNum;
  constructor(private storage: LocalStorageService) {
    this.pages = this.storage.pages;
    this.pageNum  = this.storage.pageNum;
   }

  ngOnInit() {
    this.getPages();
  }

  public getPages(){
    //console.log(this.pages[this.pageNum]);
    this.title = this.pages[this.pageNum].title;
    this.body = this.pages[this.pageNum].content;
  }

  public nextPage(){
    this.pageNum += 1;
    this.title = this.pages[this.pageNum].title;
    this.body = this.pages[this.pageNum].content;
  }

  public prevPage(){
    this.pageNum -= 1;
    this.title = this.pages[this.pageNum].title;
    this.body = this.pages[this.pageNum].content;
  }

}
