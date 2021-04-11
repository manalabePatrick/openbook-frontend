import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostBookPageRoutingModule } from './post-book-routing.module';

import { PostBookPage } from './post-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostBookPageRoutingModule
  ],
  declarations: [PostBookPage]
})
export class PostBookPageModule {}
