import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewBookPage } from './view-book.page';

const routes: Routes = [
  {
    path: '',
    component: ViewBookPage,
    children:[
      {
        path: 'book-notes',
        loadChildren: () => import('../../tabs/book-notes/book-notes.module').then( m => m.BookNotesPageModule)
      },
      {
        path: 'book-chapters',
        loadChildren: () => import('../../tabs/book-chapters/book-chapters.module').then( m => m.BookChaptersPageModule)
      },
      {
        path: '',
        redirectTo: 'book-chapters',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewBookPageRoutingModule {}
