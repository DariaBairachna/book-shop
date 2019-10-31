import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'app/shared/models';
import { LocalSlorageService, BookService } from 'app/services';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent implements OnInit {
  public categories: Array<string>;
  public autors: Array<string>;
  public currencies: Array<string>;
  public author: string;
  // public idValue: string;
  constructor(
    public dialogRef: MatDialogRef<BookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  // public generateId() {
  //   return this.idValue = Math.random().toString(36).substr(2, 9);
  // }

  public saveBook(): Book {
    return this.data
  }

  ngOnInit() {
    this.categories = ["Book", "Magazine"],
      this.autors = ["Pushkin", "Esenin"],
      this.currencies = ["USD", "UAN"];
  }




}
