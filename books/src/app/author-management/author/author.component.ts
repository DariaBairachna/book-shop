import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorViewModel } from 'app/shared/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthorService, LocalSlorageService } from 'app/services';
import { AuthorModalComponent } from '../author-modal/author-modal.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


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
  private destroyed: Subject<boolean> = new Subject<boolean>();
  public loading: boolean;
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

  public generateId() {
    return this.idValue = Math.random().toString(36).substr(2, 9);
  }

  public addAuthor(): void {
    const dialogRef = this.dialog.open(AuthorModalComponent, {
      width: '70vw',
      data: { titleModal: 'Add author', id: '', name: '' }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.destroyed)).subscribe((result) => {
      if (!result) {
       return
         
      }  
      result.id = this.generateId();
      const { titleModal, ...otherData } = result;
    
      this.authorService.addAuthor(otherData).pipe(takeUntil(this.destroyed)).subscribe(
        (response: AuthorViewModel) => {

        },
        (error) =>{
          let authorArray = JSON.parse(this.localStorageService.getItem("authors")) ;
          authorArray.push(otherData);
          this.authorData = [...this.authorData, otherData];
          this.localStorageService.setItem("authors", authorArray);
        }

      )
    });
  }
  public getAuthors(): void {
    this.loading = true;
    this.authorService.getAuthors().pipe(takeUntil(this.destroyed)).subscribe(
      (response: AuthorViewModel[]) => {
        this.authorData = response;
        this.loading = false;
      },
      (error) => {
        let authorArray = this.localStorageService.getItem("authors");
        this.authorData = JSON.parse(authorArray);
        this.loading = false;
        if (!authorArray) {
          this.localStorageService.setItem("authors", []);
        }
      }
    )
  }



  public deleteAuthor(id: string): void {
    this.authorService.deleteAuthor(id).pipe(takeUntil(this.destroyed)).subscribe(
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
    dialogRef.afterClosed().pipe(takeUntil(this.destroyed)).subscribe(result => {
      let { titleModal, ...otherData } = result;
      updatingAuthorId = result.id
      this.authorService.updateAuthor(updatingAuthorId, otherData).pipe(takeUntil(this.destroyed)).subscribe(
        (response) => {
          let authorArray = this.authorData;
          authorArray.forEach((item: AuthorViewModel, index: number) => {
            if (item.id === updatingAuthorId) {
              let data = { ...otherData }
              authorArray.splice(index, 1, data);
            }
          });
        },
        (error) => {
          let authorArray = JSON.parse(this.localStorageService.getItem("authors"));
          authorArray.forEach((item: AuthorViewModel, index: number) => {
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

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
