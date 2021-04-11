import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostBookPage } from './post-book.page';

const routes: Routes = [
  {
    path: '',
    component: PostBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostBookPageRoutingModule {}
