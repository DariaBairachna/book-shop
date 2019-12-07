import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BookViewModel, AuthorInBookModel, AuthorViewModel } from 'app/shared/models';
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
    private localStorageService: LocalSlorageService,

  ) {
    this.getBooks();
  }

  ngOnInit() {

  }

  public getBooks(): void {
    this.loading = true
    this.bookService.getBooks().pipe(takeUntil(this.destroyed)).subscribe(
      (response: BookViewModel[]) => {
        this.bookData = response;
        console.log(response)
        this.dataSource = new MatTableDataSource(this.bookData);
        this.dataSource.sort = this.sort;
        this.loading = false;
      }
    );
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async addBook() {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '70vw',
      data: { titleModal: 'Add new book', id: '', title: '', description: '', category: '', author: '', currency: '', price: '', cover: '' }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroyed)).subscribe(result => {
      let authorNames: Array<string> = [];
      result.author = result.author.map((element: AuthorViewModel)=>{
        authorNames.push(element.name); 
        return element.id;
      })
      this.bookService.addBook(result).pipe(takeUntil(this.destroyed)).subscribe(
        (response: BookViewModel) => {
          // let bookCopy = this.bookData
          // let newBook = {id: response.id,
          //               name: response.title

          // }
          // bookCopy.push()
         
          console.log(response)

          this.dataSource = new MatTableDataSource(this.bookData);
          this.getBooks();
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
        }
      });
  }


  public updateBook(element: BookViewModel): void {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '70vw',
      data: { titleModal: 'Update new book', id: element.id, title: element.title, description: element.description, category: element.category, author: element.authors, currency: element.currency, price: element.price, cover: element.cover }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroyed)).subscribe(result => {
      if (!result) {
        return
      }
      let { titleModal, ...otherData } = result;
      console.log(result)
      this.bookService.updateBook(result.id, otherData).pipe(takeUntil(this.destroyed)).subscribe(
        (response) => {
          this.getBooks();
        }
      );
    });
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

}








