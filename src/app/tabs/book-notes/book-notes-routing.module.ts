import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookNotesPage } from './book-notes.page';

const routes: Routes = [
  {
    path: '',
    component: BookNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookNotesPageRoutingModule {}
