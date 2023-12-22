import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegistrationService } from '../services/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pin-dialog',
  templateUrl: './pin-dialog.component.html',
  styleUrls: ['./pin-dialog.component.css']
})
export class PinDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private registrationService: RegistrationService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  pinForm!: FormGroup;
  ngOnInit(): void {
    setTimeout(() => {
      this.firstInputRef?.nativeElement.focus();
    }, 0);
    this.pinForm = this.formBuilder.group({
      control: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log("final pin -->" + this.finalPin);
    const user = JSON.parse(JSON.stringify(this.data)).user;
    console.log(user);
    if (this.finalPin != "" && user != null)
      this.registrationService.checkPin(user, this.finalPin).subscribe(
        response => { //vraca boolean
          console.log(response);
          if (response) {
            this.snackBar.open("Nalog je uspješno aktiviran.", '',
              {
                duration: 4000, /*ovo mi nije radilo, pa ima u providers */
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              }
            )
            this.dialogRef.close();
          } else {
            this.pinForm.reset();
            this.firstInputRef.nativeElement.focus();
            this.snackBar.open("Pogrešan pin. Pokušaj ponovo.", '',
              {
                duration: 4000, /*ovo mi nije radilo, pa ima u providers */
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              }
            )
          }
        }
      );
  }

  onCancel() {
    this.dialogRef.close();
  }

  pin = "";
  finalPin = "";

  @ViewChild('firstInput') firstInputRef!: ElementRef;

  handleKeyDown(event: KeyboardEvent, index: number) {
    const key = event.key;
    if (key === 'Backspace' && this.pin.length > 0) {
      this.pin = this.pin.slice(0, -1);
      this.finalPin = this.finalPin.slice(0, -1);
      if (index > 0) {
        const prevInput = this.firstInputRef.nativeElement.parentElement.querySelectorAll('input')[index - 1];
        prevInput.focus();
      }
    } else if (this.pin.length < 4) {
      this.pin += key;
      this.finalPin += key;
      if (index < 3) {
        setTimeout(() => {
          const nextInput = this.firstInputRef.nativeElement.parentElement.querySelectorAll('input')[index + 1];
          nextInput.focus();
        }, 0);
      }
    } else if (this.pin.length === 0) {
      this.pinForm.reset();
      this.firstInputRef.nativeElement.focus();

    }
  }

}
