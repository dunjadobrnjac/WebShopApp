import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegistrationService } from '../services/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private router: Router) { }


  ngOnInit(): void {
    setTimeout(() => {
      this.firstInputRef?.nativeElement.focus();
    }, 0);
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

  pin = ['', '', '', '']; // Array to hold individual digits

  finalPin = "";

  @ViewChild('firstInput') firstInputRef!: ElementRef;

  handleKeyDown(event: KeyboardEvent, index: number) {
    const key = event.key;

    if (key === 'Backspace' && index >= 0) {
      // Delete the character at the current index
      this.pin[index] = '';
      this.finalPin = this.pin.join('');

      // Focus on the previous input, or reset focus if already at the first input
      if (index > 0) {
        const prevInput = this.firstInputRef.nativeElement.parentElement.querySelectorAll('input')[index - 1];
        prevInput.focus();
      } else {
        this.firstInputRef.nativeElement.focus();
      }
    } else if (key.length === 1 && this.pin.filter(char => char !== '').length < 4) {
      // Add the character only if it's a single character and there's less than 4 digits
      this.pin[index] = key;
      this.finalPin = this.pin.join('');

      // Focus on the next input if applicable
      if (index < 3) {
        setTimeout(() => {
          const nextInput = this.firstInputRef.nativeElement.parentElement.querySelectorAll('input')[index + 1];
          nextInput.focus();
        }, 0);
      }
    } else if (this.pin.every(char => char === '')) {
      this.firstInputRef.nativeElement.focus();
    }
  }


}
