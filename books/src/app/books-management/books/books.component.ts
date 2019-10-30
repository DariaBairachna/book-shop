import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'app/shared/models';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BookModalComponent } from '..';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  public bookData: Book[] = [
    { id: this.generateId(), name: 'Hydrogen', description: "some book", category: 'H', author: ["Pushkin"], currency: "$", price: 25},
    { id: this.generateId(), name: 'Hydrogen', description: "some book", category: 'H', author: ["Pushkin"], currency: "$", price: 25},
    { id: this.generateId(), name: 'Hydrogen', description: "some book", category: 'H', author: ["Pushkin"], currency: "$", price: 25},
    { id: this.generateId(), name: 'Hydrogen', description: "some book", category: 'H', author: ["Pushkin"], currency: "$", price: 25},
    { id: this.generateId(), name: 'Hydrogen', description: "some book", category: 'H', author: ["Pushkin"], currency: "$", price: 25},
    { id: this.generateId(), name: 'Hydrogen', description: "some book", category: 'H', author: ["Pushkin"], currency: "$", price: 25},
    { id: this.generateId(), name: 'Hydrogen', description: "some book", category: 'H', author: ["Pushkin"], currency: "$", price: 25},

  ];
  public displayedColumns: string[] = ['id', 'name', 'description', 'category', 'author', 'price', 'controls'];
  public dataSource = new MatTableDataSource(this.bookData);
  public idValue: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  public generateId() {
    return this.idValue = Math.random().toString(36).substr(2, 9);
  }

  public addBook(){
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '70vw',
      data: {titleModal: "Add new book", title: 'Hydrogen', description: "some book", category: 'H', author: ["Pushkin"], currency: "$", price: 25 }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}









