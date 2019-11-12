import { Component, OnInit, Inject } from '@angular/core';
import { AuthorViewModel } from 'app/shared/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-author-modal',
  templateUrl: './author-modal.component.html',
  styleUrls: ['./author-modal.component.scss']
})
export class AuthorModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AuthorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
  }

  ngOnInit() {
  }

  public close(): void {
    this.dialogRef.close();
  }

  public saveAuthor(): AuthorViewModel {
    return this.data;
  }
}
