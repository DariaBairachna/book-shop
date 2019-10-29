import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'app/shared/models';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-books',
  templateUrl: './books-management.component.html',
  styleUrls: ['./books-management.component.scss']
})
export class BooksManagementComponent implements OnInit {
  public bookData: Book[] = [
    { id: this.generateId(), name: 'Hydrogen', description: "some book", category: 'H', author: "Pushkin", price: 25 },
    { id: this.generateId(), name: 'Hydrogen', description: "some book", category: 'H', author: "Pushkin", price: 25 },
    { id: this.generateId(), name: 'Hydrogen', description: "some book", category: 'H', author: "Pushkin", price: 25 },
    { id: this.generateId(), name: 'Hydrogen', description: "some book", category: 'H', author: "Pushkin", price: 25 },
    { id: this.generateId(), name: 'Hydrogen', description: "some book", category: 'H', author: "Pushkin", price: 25 },
    { id: this.generateId(), name: 'Hydrogen', description: "some book", category: 'H', author: "Pushkin", price: 25 },
    { id: this.generateId(), name: 'Hydrogen', description: "some book", category: 'H', author: "Pushkin", price: 25 },

  ];
  public displayedColumns: string[] = ['id', 'name', 'description', 'category', 'author', 'price'];
  public dataSource = new MatTableDataSource(this.bookData);
  private idValue: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  public generateId() {
    return this.idValue = Math.random().toString(36).substr(2, 9);
  }


}









