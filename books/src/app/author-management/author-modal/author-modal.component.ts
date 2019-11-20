import { Component, OnInit, Inject } from '@angular/core';
import { AuthorViewModel } from 'app/shared/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-author-modal',
  templateUrl: './author-modal.component.html',
  styleUrls: ['./author-modal.component.scss']
})
export class AuthorModalComponent implements OnInit {
  public loading: boolean;
  constructor(
    public dialogRef: MatDialogRef<AuthorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.loading = false;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public saveAuthor(): AuthorViewModel {
    return this.data;
  }
}
