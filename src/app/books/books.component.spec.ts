import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list/book-list.component';
import { BooksComponent } from './books.component';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BooksComponent,
        BookListComponent
      ],
      imports: [
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
