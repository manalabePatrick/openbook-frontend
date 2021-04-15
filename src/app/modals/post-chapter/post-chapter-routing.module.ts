import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostChapterPage } from './post-chapter.page';

const routes: Routes = [
  {
    path: '',
    component: PostChapterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostChapterPageRoutingModule {}
