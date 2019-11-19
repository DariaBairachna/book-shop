import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BookViewModel } from 'app/shared/models';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { BookService, LocalSlorageService } from 'app/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  private destroyed: Subject<boolean> = new Subject();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    private localStorageService: LocalSlorageService,
  ) {
    // this.dataSource = new MatTableDataSource(this.bookData);
    // this.dataSource.sort = this.sort;
    this.getBooks();
  }

  ngOnInit() {

  }

  public getBooks(): void {
    this.bookService.getBooks().pipe(takeUntil(this.destroyed)).subscribe(
      (response: BookViewModel[]) => {
        this.bookData = response;
        this.dataSource = new MatTableDataSource(this.bookData);
        this.dataSource.sort = this.sort;
      },
      (error) => {
        let bookArray = this.localStorageService.getItem("books");
        this.bookData = JSON.parse(bookArray);
        this.dataSource = new MatTableDataSource(this.bookData);
        this.dataSource.sort = this.sort;
        if (!bookArray) {
          this.localStorageService.setItem("books", []);
        }
      }
    );
  }

  public generateId() {
    return this.idValue = Math.random().toString(36).substr(2, 9);
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
   }

  public addBook() {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '70vw',
      data: { titleModal: 'Add new book', id: '', title: '', description: '', category: '', author: '', currency: '', price: '', cover: '' }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroyed)).subscribe(result => {
      if (!result) {
        return
      }
      result.id = this.generateId();
      const { titleModal, ...otherData } = result;
      this.bookService.addBook(otherData).pipe(takeUntil(this.destroyed)).subscribe(
        (response) => {
          console.log(response);
          this.dataSource = new MatTableDataSource(this.bookData);
          this.dataSource.sort = this.sort;
        },
        (error) => {
          let bookArray = JSON.parse(this.localStorageService.getItem("books"));
          bookArray.push(otherData)
          this.bookData = [...this.bookData, otherData];
          this.localStorageService.setItem("books", bookArray);
          this.dataSource = new MatTableDataSource(this.bookData);
          this.dataSource.sort = this.sort;
        }
      )
    });
  }

  public deleteBook(id: string): void {
    this.bookService.deleteBook(id).pipe(takeUntil(this.destroyed)).subscribe(
      (response) => {
        if (response) {
          let books = this.bookData.filter((item: BookViewModel) => {
            return item.id !== id;
          });
          this.bookData = books;
        }
      },
      (error) => {
        let books = this.bookData.filter((item: BookViewModel) => {
          return item.id !== id;
        });
        this.localStorageService.setItem("books", books);
        this.bookData = books;
      }
    );
  }


  public updateBook(element: BookViewModel): void {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '70vw',
      data: { titleModal: 'Update new book', id: element.id, title: element.title, description: element.description, category: element.category, author: element.author, currency: element.currency, price: element.price, cover: element.cover }
    });

    let updatingBookId: string;
    dialogRef.afterClosed().pipe(takeUntil(this.destroyed)).subscribe(result => {
      if (!result) {
        return
      }
      let { titleModal, ...otherData } = result;
      updatingBookId = result.id
      this.bookService.updateBook(updatingBookId, otherData).pipe(takeUntil(this.destroyed)).subscribe(
        (response) => {
          let bookArray = this.bookData;
          bookArray.forEach((item: BookViewModel, index: number) => {
            if (item.id === updatingBookId) {
              let data = { ...otherData }
              bookArray.splice(index, 1, data);
            }
          });
        },
        (error) => {
          let bookArray: BookViewModel[] = JSON.parse(this.localStorageService.getItem("books"));
          bookArray.forEach((item: BookViewModel, index: number) => {
            if (item.id === updatingBookId) {
              let data = { ...otherData }
              bookArray.splice(index, 1, data);
            }
          });
          this.bookData = bookArray;
          this.localStorageService.setItem("books", bookArray);
        }
      );
    });
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

}








