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
  public dataSource: MatTableDataSource<AuthorViewModel>;
  public idValue: string;
  private destroyed: Subject<boolean> = new Subject<boolean>();
  public loading: boolean;
  public filterValue: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private authorService: AuthorService,
  ) { }

  ngOnInit() {

    this.getAuthors();
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  public addAuthor(): void {
    const dialogRef = this.dialog.open(AuthorModalComponent, {
      width: '70vw',
      data: { titleModal: 'Add author', id: '', name: '' }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.destroyed)).subscribe((result) => {
      this.loading = false;
      const { titleModal, ...otherData } = result;
      this.authorService.addAuthor(otherData).pipe(takeUntil(this.destroyed)).subscribe(
        (response) => {
          this.authorData.push(response);
          this.dataSource = new MatTableDataSource(this.authorData);
          this.dataSource.sort = this.sort;
          this.loading = false;
        }
      );
    });
  }
  public getAuthors(): void {
    this.loading = true;
    this.authorService.getAuthors().pipe(takeUntil(this.destroyed)).subscribe(
      (response: AuthorViewModel[]) => {
        this.authorData = response;
        this.dataSource = new MatTableDataSource(this.authorData);
        this.dataSource.sort = this.sort;
        this.loading = false;
        return this.authorData;
      }
    )
  }

  public deleteAuthor(id: number): void {
    this.loading = true;
    this.authorService.deleteAuthor(id).pipe(takeUntil(this.destroyed)).subscribe(
      (response) => {
        if (response) {
          let authors = this.authorData.filter((item: AuthorViewModel) => {
            return item.id !== id;
          });
          this.authorData = authors;
          this.dataSource = new MatTableDataSource(this.authorData);
          this.dataSource.sort = this.sort;
          this.loading = false;
        }
      }
    );

  }
  public updateAuthor(element: AuthorViewModel): void {
    const dialogRef = this.dialog.open(AuthorModalComponent, {
      width: '70vw',
      data: { titleModal: 'Update author', id: element.id, name: element.name }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroyed)).subscribe(result => {
      this.loading = true;
      let { titleModal, ...otherData } = result;
      this.authorService.updateAuthor(result.id, otherData).pipe(takeUntil(this.destroyed)).subscribe(
        (response) => {
          let indexData: number;
          this.authorData.forEach((item, index) => {
            if (item.id === element.id) {
              indexData = index;
            }
            return indexData;
          });
          this.authorData.splice(indexData, 1, otherData);
          this.dataSource = new MatTableDataSource(this.authorData);
          this.dataSource.sort = this.sort;
          this.loading = false;
        }
      );

    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
