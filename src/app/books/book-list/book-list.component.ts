import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LanguagesService } from './languages.service';
import { EnvironmentService } from '../../shared/environment/environment.service';
import { Book } from '../../shared/interfaces/book-interface';
import { SearchResult } from '../../shared/interfaces/searchResult-interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  languagesArray!: Array<{ code: string, name: string }>;
  orders: string[] = ['', 'relevance', 'newest'];
  queryParams = '';

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1)]),
    author: new FormControl(''),
    language: new FormControl(''),
    orderBy: new FormControl('')
  });

  apiKey: string;
  bookCollections: Array<Book> = [];
  isBookAvailable = false;
  startIndex = 0;
  isLoading = false;

  constructor(public http: HttpClient, public langService: LanguagesService, public env: EnvironmentService) {
    this.apiKey = env.apiKey;
  }

  ngOnInit(): void {
    this.languagesArray = this.langService.returnLanguages();
    this.checkTheForm();
  }

  checkTheForm() {
    this.startIndex = 0;
    this.form.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(formValues => {
          this.queryParams = '';
          if (formValues) {

            if (formValues.title !== '') {
              this.addPlusSign();
              this.queryParams = `intitle:${formValues.title}`;
            }

            if (formValues.author !== '') {
              this.addPlusSign();
              this.queryParams += `inauthor:${formValues.author}`;
            }
            if (formValues.language !== '') {
              this.addAmpersand();
              this.queryParams += `langRestrict=${formValues.language}`;
            }
            if (formValues.orderBy !== '') {
              this.addAmpersand();
              this.queryParams += `orderBy=${formValues.orderBy}`;
            }
            this.checkQueryParams();
          }
          return of(this.queryParams);
        })
      )
      .subscribe(
        queryPar => {
          this.bookCollections = [];
          return (this.queryParams = queryPar);
        },
        err => {
          window.alert(`Error: ${err}`);
        }
      );
  }

  private addPlusSign() {
    if (this.queryParams !== '') {
      this.queryParams += '+';
    }
  }
  private addAmpersand() {
    if (this.queryParams !== '') {
      this.queryParams += '&';
    }
  }

  private checkQueryParams(): void {
    this.isLoading = true;
    if (this.queryParams !== '') {
      this.fetchBooks();
    } else {
      this.bookCollections = [];
      this.isLoading = false;
    }
  }

  private fetchBooks() {
    this.http
      .get(`https://www.googleapis.com/books/v1/volumes?q=${this.queryParams}&startIndex=${this.startIndex}&maxResults=10&key=${this.apiKey}`)
      .subscribe(
        data => {
          const searchResults: SearchResult = data as SearchResult;
          if (searchResults.totalItems !== 0) {
            searchResults.items.forEach((item) => {
              console.log(item);
              this.isBookAvailable = false;
              this.bookCollections.push(item as Book);
            });
            this.isLoading = false;
          } else {
            window.alert('None books available!');
            this.isLoading = false;
          }
        },
        err => {
          window.alert(`Error: ${err}`);
        });
  }
  public onScroll() {
    this.startIndex += 10;
    this.checkQueryParams();
  }
}

