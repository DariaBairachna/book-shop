import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookViewModel, AuthorViewModel, CategoryViewModel } from 'app/shared/models';
import { AuthorService, LocalSlorageService } from 'app/services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FileHelper } from 'app/shared/helpers/file.helper';


@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss'],
  providers: [FileHelper]
})
export class BookModalComponent implements OnInit, OnDestroy {
  public categories: Array<CategoryViewModel>;
  public autors: Array<AuthorViewModel>;
  public currencies: Array<string>;
  public author: string;
  public imageSrc: string = "./assets/img/Vector.png";
  private destroyed: Subject<boolean> = new Subject();
  constructor(
    public dialogRef: MatDialogRef<BookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authorService: AuthorService,
    private localStorageService: LocalSlorageService,
    private fileHelper: FileHelper,
  ) {

  }

  public close(): void {
    this.dialogRef.close();
  }


  public saveBook(): BookViewModel {
    return this.data;
  }

  ngOnInit() {
    this.categories = [{
      id: "123456",
      category: "Book"
    },
    {
      id: "123457",
      category: "Magazine"
    }];
    this.currencies = ["USD", "UAN"];
    this.getAuthors();
  }

  public getAuthors(): void {
    this.authorService.getAuthors().pipe(takeUntil(this.destroyed)).subscribe(
      (response: AuthorViewModel[]) => {
        this.autors = response;
      },
      (error) => {
        let authorArray = this.localStorageService.getItem("authors");
        this.autors = JSON.parse(authorArray);
        if (!authorArray) {
          this.localStorageService.setItem("authors", []);
        }
      }
    )
  }

  public uploadCover(event: any) {
    this.fileHelper.uploadImage(event).pipe(takeUntil(this.destroyed)).subscribe(file => {this.imageSrc = file});
  }


  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
