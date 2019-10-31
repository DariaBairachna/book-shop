import { Component, OnInit, ViewChild, DoCheck, ChangeDetectorRef } from '@angular/core';
import { Book } from 'app/shared/models';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { BookService, LocalSlorageService } from 'app/services';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  public bookData: Book[] = [];
  public displayedColumns: string[] = ['id', 'title', 'description', 'category', 'author', 'price', 'controls'];
  public dataSource = new MatTableDataSource(this.bookData);
  public idValue: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    private localStorageService: LocalSlorageService,
    private ref: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getBooks();

  }


  public getBooks(): void {
    this.bookService.getBooks().subscribe(

      (response: Book[]) => {
        this.bookData = response;
      },
      (error) => {
        let bookArray = this.localStorageService.getItem("books");
        this.bookData = JSON.parse(bookArray);

        if (!bookArray) {
          this.localStorageService.setItem("books", []);
        }
      }
    );
  }

  public generateId() {
    return this.idValue = Math.random().toString(36).substr(2, 9);
  }

  public addBook(): any {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '70vw',
      data: { titleModal: 'Add new book', id: '', title: '', description: '', category: '', author: '', currency: '', price: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      result.id = this.generateId();
      const { titleModal, ...otherData } = result;
      this.bookService.addBook(otherData).subscribe(
        (result) => {
          console.log(otherData);
        },
        (error) => {
          let bookArray = JSON.parse(this.localStorageService.getItem("books"));
          // let bookArray = this.bookData;
          bookArray.push(otherData)
          this.bookData = [...this.bookData, otherData];
          this.localStorageService.setItem("books", bookArray);

        }
      )
   

    });
  }

  public deleteBook(id: string): void {
    this.bookService.deleteBook(id).subscribe(
      (response) => {
        if (response) {
          let books = this.bookData.filter((item: Book) => {
            return item.id !== id;
          });
          this.bookData = books;
        }
      },
      (error) => {
        let books = this.bookData.filter((item: Book) => {
          return item.id !== id;
          // if (item.id === id) {
          //   books.splice(index, 1);
          //   return books;
          // }
        });
        this.localStorageService.setItem("books", books);
        this.bookData = books;
      }
    );

  }

  public updateBook(element: Book): void {

    // id: string, updatedData: Book
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '70vw',
      data: { titleModal: 'Update new book', id: element.id, title: element.title, description: element.description, category: element.category, author: element.author, currency: element.currency, price: element.price }
    });

    let updatingBookId: string;
    dialogRef.afterClosed().subscribe(result => {
      let { titleModal, ...otherData } = result;
      updatingBookId = result.id
      console.log(otherData);
      console.log(titleModal)
      // this.bookData = [...this.bookData, otherData];
      this.bookService.updateBook(updatingBookId, otherData).subscribe(
        (response) => {
          if (result) {

          }
        },
        (error) => {
          let bookArray = JSON.parse(this.localStorageService.getItem("books"));
          bookArray.map((item: Book, index: number) => {
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
}








