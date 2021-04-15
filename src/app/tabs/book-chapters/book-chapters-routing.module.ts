import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookChaptersPage } from './book-chapters.page';

const routes: Routes = [
  {
    path: '',
    component: BookChaptersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookChaptersPageRoutingModule {}
