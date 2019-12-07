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
      const { titleModal, ...otherData } = result;
      this.authorService.addAuthor(otherData).pipe(takeUntil(this.destroyed)).subscribe(
        (result) => {
          this.getAuthors();
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
    this.authorService.deleteAuthor(id).pipe(takeUntil(this.destroyed)).subscribe(
      (response) => {
        this.getAuthors();
      }
    );

  }
  public updateAuthor(element: AuthorViewModel): void {
    const dialogRef = this.dialog.open(AuthorModalComponent, {
      width: '70vw',
      data: { titleModal: 'Update author', id: element.id, name: element.name }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroyed)).subscribe(result => {
      let { titleModal, ...otherData } = result;
      this.authorService.updateAuthor(result.id, otherData).pipe(takeUntil(this.destroyed)).subscribe(
        (result) => {
          this.getAuthors();
        }
      );

    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
