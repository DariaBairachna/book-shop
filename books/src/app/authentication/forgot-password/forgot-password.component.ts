import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from 'app/services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'app/shared/components/alert/alert.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public forgotPasswordForm: FormGroup;
  private destroyed: Subject<boolean> = new Subject<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email])
    })

  }

  ngOnInit() {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: {content: 'Invalide email'}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  public onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return false;
    }
    this.authService.forgotPassword(this.forgotPasswordForm.value).pipe(takeUntil(this.destroyed)).subscribe(
      (response: string) => {

        if (response) {
          this.router.navigate(['/books-management']);
        }

      },
      (reject) => {
        this.openDialog();

      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
