import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { env } from 'process';
import { EnvironmentService } from 'src/app/shared/environment/environment.service';
import { BookListComponent } from './book-list.component';
import { LanguagesService } from './languages.service';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let checkTheForm: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookListComponent],
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });
  // checkTheForm = component.checkTheForm();
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('#checkTheForm should turn on action for valueChanges', () => {
    checkTheForm = component.checkTheForm();
    const comp = new BookListComponent(
      component.http,
      component.langService,
      component.env
    );

    component.checkTheForm();
    expect(comp.startIndex).toBe(0, 'the place where the indexing should start');

    comp.form.controls.title.setValue('test');
    const spy = spyOn(comp, checkTheForm);
    expect(spy).toHaveBeenCalledTimes(1);
    // const spy: any = spyOn(component, checkTheForm);
    // component.form.controls.name.setValue('test') // This will trigger change
    // expect(spy)
  });

});

