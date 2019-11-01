import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookViewModel } from 'app/shared/models';

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

  constructor(
    public dialogRef: MatDialogRef<BookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  public close(): void {
    this.dialogRef.close();
  }

  public saveBook(): BookViewModel {
    return this.data
  }

  ngOnInit() {
    this.categories = ["Book", "Magazine"],
      this.autors = ["Pushkin", "Esenin"],
      this.currencies = ["USD", "UAN"];
  }




}
