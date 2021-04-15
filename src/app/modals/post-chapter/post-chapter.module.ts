import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostChapterPageRoutingModule } from './post-chapter-routing.module';

import { PostChapterPage } from './post-chapter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostChapterPageRoutingModule
  ],
  declarations: [PostChapterPage]
})
export class PostChapterPageModule {}
