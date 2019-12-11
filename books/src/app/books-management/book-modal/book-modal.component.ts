import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookViewModel, AuthorViewModel, CategoryViewModel, ButtonViewModel } from 'app/shared/models';
import { AuthorService, LocalSlorageService } from 'app/services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FileHelper } from 'app/shared/helpers/file.helper';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss'],
  providers: [FileHelper]
})
export class BookModalComponent implements OnInit, OnDestroy {
  public bookForm: FormGroup
  public categories: Array<CategoryViewModel>;
  public authors: Array<AuthorViewModel>;
  public currencies: Array<string>;
  public author: string;
  public saveButtonData: ButtonViewModel = new ButtonViewModel;
  public imageSrc: string = "./assets/img/Vector.png";
  private destroyed: Subject<boolean> = new Subject();
  public loading: boolean;
  constructor(
    public dialogRef: MatDialogRef<BookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authorService: AuthorService,
    private fileHelper: FileHelper,
    private formBuilder: FormBuilder,
  ) {

    this.saveButtonData = {
      title: "Save",
      class: "orange-btn",
      loading: false,
      disabled: true,
    };
    this.getAuthors();

    this.bookForm = this.formBuilder.group({
      title: new FormControl(this.data.title, [Validators.required]),
      description: new FormControl(this.data.description),
      category: new FormControl(this.data.category, [Validators.required]),
      authors: new FormControl(this.data.authors, [Validators.required]),
      price: new FormControl(this.data.price),
      currency: new FormControl(this.data.currency),
    });

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

    if (!this.bookForm.invalid) {
      this.saveButtonData.disabled = false;
    }
    this.bookForm.valueChanges.pipe(takeUntil(this.destroyed)).subscribe(data => {
      if (!this.bookForm.invalid) {
        this.saveButtonData.disabled = false;
      }
    }

    )
  }
  public close(): void {
    this.dialogRef.close();
  }


  public saveBook(): BookViewModel {
    this.data = this.bookForm.value; 
    this.saveButtonData.loading = true;
    return this.data;
  }

  public getAuthors(): void {
    this.loading = true;
    this.authorService.getAuthors().pipe(takeUntil(this.destroyed)).subscribe(
      (response: AuthorViewModel[]) => {
        this.authors = response;
        this.loading = false;
      }
    )

  }

  public uploadCover(event: any) {
    this.fileHelper.uploadImage(event).pipe(takeUntil(this.destroyed)).subscribe(file => { this.imageSrc = file });
  }


  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
