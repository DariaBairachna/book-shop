import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService, ValidationService, LocalSlorageService } from 'app/services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'app/shared/components/alert/alert.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoginViewModel, ButtonViewModel } from 'app/shared/models';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public resetPasswordForm: FormGroup;
  public resetButtonData: ButtonViewModel = new ButtonViewModel();;
  private destroyed: Subject<boolean> = new Subject<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private localSlorageService: LocalSlorageService,
    public dialog: MatDialog,
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required, ValidationService.validationPassword]),
      confirmPassword: new FormControl('', [Validators.required, ValidationService.validationPassword])
    },
      {
        validator: ValidationService.comparePassword
      });
    this.resetButtonData = {
      title: "Reset password",
      class: "orange-btn",
      loading: false,
      disabled: true,
    };
    this.resetPasswordForm.valueChanges.pipe(takeUntil(this.destroyed)).subscribe(data => {
      console.log(this.resetPasswordForm)
      if (!this.resetPasswordForm.invalid) {
        this.resetButtonData.disabled = false;
      }
      this.resetButtonData.disabled = true;
    });
  }

  ngOnInit() {

  }

  public openDialog(content: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { content: content }
    });


    dialogRef.afterClosed().subscribe(result => {

    });
  }

  public onSubmit() {

    this.resetButtonData.loading = true;
    if (this.resetPasswordForm.invalid) {
      this.resetButtonData.loading = false;
      return false;
    }
    if (this.resetPasswordForm.get('password').value === this.resetPasswordForm.get('confirmPassword').value) {
      let user: LoginViewModel = JSON.parse(this.localSlorageService.getItem('defaultUser'));
      let password = this.resetPasswordForm.get('password').value;
      this.authService.resetPassword(user.id, password).pipe(takeUntil(this.destroyed)).subscribe(
        (response: string) => {
          user.password = password;
          this.localSlorageService.removeItem('defaultUser');
          this.localSlorageService.setItem('defaultUser', user);
          this.openDialog('Password change');
          this.resetButtonData.loading = false;
        },
        (reject) => {

          user.password = password;
          this.localSlorageService.removeItem('defaultUser');
          this.localSlorageService.setItem('defaultUser', user);
          this.resetButtonData.loading = false;
          this.openDialog('Password change');
        });

    }
    this.openDialog('Passwords are not equal');
    return false;

  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
