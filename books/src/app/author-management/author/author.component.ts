import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorViewModel } from 'app/shared/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthorService, LocalSlorageService } from 'app/services';
import { AuthorModalComponent } from '../author-modal/author-modal.component';


@Component({
  selector: 'app-author-management',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  public authorData: AuthorViewModel[] = [];
  public displayedColumns: string[] = ['id', 'name', 'product', 'controls'];
  public dataSource = new MatTableDataSource(this.authorData);
  public idValue: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private authorService: AuthorService,
    private localStorageService: LocalSlorageService,
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getAuthors();
  }

  public addAuthor(): void {
    const dialogRef = this.dialog.open(AuthorModalComponent, {
      width: '70vw',
      data: { titleModal: 'Add author', id: '', name: '' }
    });



    dialogRef.afterClosed().subscribe((result) => {
      result.id = this.generateId();
      const { titleModal, ...otherData } = result;
      this.authorService.addAuthor(otherData).subscribe(
        (response: AuthorViewModel) => {
          console.log(response);
        },
        (error) =>{
          let authorArray = this.authorData;
          authorArray.push(otherData);
          this.authorData = [...this.authorData, otherData];
          this.localStorageService.setItem("authors", authorArray);
        }

      )
    });
  }
  public getAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (response: AuthorViewModel[]) => {
        this.authorData = response;
      },
      (error) => {
        let authorArray = this.localStorageService.getItem("authors");
        this.authorData = JSON.parse(authorArray);

        if (!authorArray) {
          this.localStorageService.setItem("authors", []);
        }
      }
    )
  }

  public generateId() {
    return this.idValue = Math.random().toString(36).substr(2, 9);
  }

  public deleteAuthor(id: string): void {
    this.authorService.deleteAuthor(id).subscribe(
      (response) => {
        if (response) {
          let authors = this.authorData.filter((item: AuthorViewModel) => { item.id !== id });
          this.authorData = authors;
        }
      },
      (error) => {
        let authors = this.authorData.filter((item: AuthorViewModel) => { item.id !== id; });
        this.localStorageService.setItem("authors", authors);
        this.authorData = authors;
      }
    );

  }
  public updateAuthor(element: AuthorViewModel): void {
    const dialogRef = this.dialog.open(AuthorModalComponent, {
      width: '70vw',
      data: { titleModal: 'Update author', id: element.id, name: element.name }
    });

    let updatingAuthorId: string;
    dialogRef.afterClosed().subscribe(result => {
      let { titleModal, ...otherData } = result;
      updatingAuthorId = result.id
      this.authorService.updateAuthor(updatingAuthorId, otherData).subscribe(
        (response) => {
          let authorArray = this.authorData;
          authorArray.map((item: AuthorViewModel, index: number) => {
            if (item.id === updatingAuthorId) {
              let data = { ...otherData }
              authorArray.splice(index, 1, data);
            }
          });
        },
        (error) => {
          let authorArray = JSON.parse(this.localStorageService.getItem("authors"));
          authorArray.map((item: AuthorViewModel, index: number) => {
            if (item.id === updatingAuthorId) {
              let data = { ...otherData }
              authorArray.splice(index, 1, data);
            }
          });
          this.authorData = authorArray;
          this.localStorageService.setItem("authors", authorArray);
        }
      );
    });
  }
}
