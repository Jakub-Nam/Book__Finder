import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookListComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  providers: [],
  exports: [BooksComponent, BookListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
