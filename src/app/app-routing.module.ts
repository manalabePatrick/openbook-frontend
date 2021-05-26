import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'my-books',
    loadChildren: () => import('./pages/my-books/my-books.module').then( m => m.MyBooksPageModule)
  },
  {
    path: 'post-book',
    loadChildren: () => import('./modals/post-book/post-book.module').then( m => m.PostBookPageModule)
  },
  {
    path: 'view-book',
    loadChildren: () => import('./pages/view-book/view-book.module').then( m => m.ViewBookPageModule)
  },
  {
    path: 'book-notes',
    loadChildren: () => import('./tabs/book-notes/book-notes.module').then( m => m.BookNotesPageModule)
  },
  {
    path: 'book-chapters',
    loadChildren: () => import('./tabs/book-chapters/book-chapters.module').then( m => m.BookChaptersPageModule)
  },  {
    path: 'post-chapter',
    loadChildren: () => import('./modals/post-chapter/post-chapter.module').then( m => m.PostChapterPageModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./pages/library/library.module').then( m => m.LibraryPageModule)
  },
  {
    path: 'read',
    loadChildren: () => import('./pages/read/read.module').then( m => m.ReadPageModule)
  },
  {
    path: 'send-message',
    loadChildren: () => import('./modals/send-message/send-message.module').then( m => m.SendMessagePageModule)
  },
  {
    path: 'letters',
    loadChildren: () => import('./pages/letters/letters.module').then( m => m.LettersPageModule)
  },
  {
    path: 'diary',
    loadChildren: () => import('./pages/diary/diary.module').then( m => m.DiaryPageModule)
  },
  {
    path: 'avatars',
    loadChildren: () => import('./modals/avatars/avatars.module').then( m => m.AvatarsPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
