import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BookViewModel, AuthorViewModel, BookResponseViewModel } from 'app/shared/models';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { BookService, LocalSlorageService } from 'app/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, OnDestroy {
  public bookData: BookViewModel[] = [];
  public filterValue: string;
  public displayedColumns: string[] = ['id', 'title', 'description', 'category', 'author', 'price', 'controls'];
  public dataSource: MatTableDataSource<BookViewModel>;
  public idValue: string;
  public loading: boolean;
  private destroyed: Subject<boolean> = new Subject();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private bookService: BookService,

  ) {
    this.getBooks();
  }

  ngOnInit() {

  }

  public getBooks(): void {
    this.loading = true;
    this.bookService.getBooks().pipe(takeUntil(this.destroyed)).subscribe(
      (response: BookViewModel[]) => {
        this.bookData = response;
        console.log(response)
        this.dataSource = new MatTableDataSource(this.bookData);
        this.dataSource.sort = this.sort;
        this.loading = false;
        console.log(this.bookData)
      }
    );
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async addBook() {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '70vw',
      data: { titleModal: 'Add new book', id: '', title: '', description: '', category: '', authors: [], currency: '', price: null, cover: '' }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroyed)).subscribe(result => {
      this.loading = true;
      this.bookService.addBook(result).pipe(takeUntil(this.destroyed)).subscribe(
        (value: BookResponseViewModel) => {
          let newBook = { ...value.book, authors: value.authors }
          this.bookData.push(newBook);
          this.dataSource = new MatTableDataSource(this.bookData);
          this.dataSource.sort = this.sort;
          this.loading = false;
        }
      );

    });
  }

  public deleteBook(id: number): void {
    this.bookService.deleteBook(id).pipe(takeUntil(this.destroyed)).subscribe(
      (response) => {
        if (response) {
          let books = this.bookData.filter((item: BookViewModel) => {
            return item.id !== id;
          });
          this.bookData = books;
          this.dataSource = new MatTableDataSource(this.bookData);
          this.dataSource.sort = this.sort;
          this.loading = false;
        }
      });
  }


  public updateBook(element: BookViewModel): void {
    element.authorsId = element.authors.map((author: AuthorViewModel) => {
      return author.id
    })
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '70vw',
      data: { titleModal: 'Update new book', id: element.id, title: element.title, description: element.description, category: element.category,  authors: element.authorsId, currency: element.currency, price: element.price, cover: element.cover }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.destroyed)).subscribe(result => {
      if (!result) {
        return
      }
      let book = {
        id: element.id,
        ...result
      }
      this.bookService.updateBook(book).pipe(takeUntil(this.destroyed)).subscribe(
        (response) => {
          let indexBook: number;
          this.bookData.forEach((item, index) => {
            if (item.id === element.id) {
              indexBook = index;
            }
            return indexBook;
          });
          this.bookData.splice(indexBook, 1, book);
          console.log(this.bookData)
          this.dataSource = new MatTableDataSource(this.bookData);
          this.dataSource.sort = this.sort;
          this.loading = false;

        }
      );
    });
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

}








