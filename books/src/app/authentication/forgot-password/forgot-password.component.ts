import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from 'app/services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'app/alert/alert.component';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;

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

    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  public onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return false;
    }
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      (response: object) => {

        if (response) {
          this.router.navigate(['/home']);
        }

      },
      (reject) => {
        this.openDialog();

      });
  }

}
