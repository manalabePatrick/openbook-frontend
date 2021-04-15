import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookNotesPageRoutingModule } from './book-notes-routing.module';

import { BookNotesPage } from './book-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookNotesPageRoutingModule
  ],
  declarations: [BookNotesPage]
})
export class BookNotesPageModule {}
