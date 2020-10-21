import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BooksComponent } from './books/books.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BooksComponent,
        BookListComponent
      ],
      imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        InfiniteScrollModule,

      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'ang-sass'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('ang-sass');
  // });
});
