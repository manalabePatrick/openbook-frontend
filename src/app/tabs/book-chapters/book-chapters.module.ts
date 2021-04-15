import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookChaptersPageRoutingModule } from './book-chapters-routing.module';

import { BookChaptersPage } from './book-chapters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookChaptersPageRoutingModule
  ],
  declarations: [BookChaptersPage]
})
export class BookChaptersPageModule {}
