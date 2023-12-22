import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interface/interfaces';
import { RegistrationService } from '../services/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PinDialogComponent } from '../pin-dialog/pin-dialog.component';

interface UserWithPin {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  city: string;
  email: string;
  telephone: string;
  status: number;
  pin: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) { }

  registrationForm!: FormGroup;
  loginForm!: FormGroup;

  user!: any;
  usernameL!: string;
  passwordL!: string;

  hide = true;//za sakrivanje lozinke

  ngOnInit() {
    this.user = {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      city: "",
      email: "",
      telephone: "",
      status: 1
    }
    this.registrationForm = this.formBuilder.group({
      firstName: ['',],
      lastName: ['',],
      username: ['', []],
      password: ['', []],
      city: ['', []],
      telephone: ['', []],
      email: ['', []],
    });
    /*this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      city: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{3}\/\d{3}-\d{3}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });*/

    this.loginForm = this.formBuilder.group({
      usernameL: ['', Validators.required],
      passwordL: ['', Validators.required],
    });
  }

  @ViewChild('container') container: ElementRef | undefined;

  togglePanel(isSignUp: boolean): void {
    if (isSignUp) {
      this.container?.nativeElement.classList.add('right-panel-active');
    } else {
      this.container?.nativeElement.classList.remove('right-panel-active');
    }
  }

  avatarImageFile: any;
  onFileSelected(event: any) {
    /* za dodavanje fajla prilikom registracije */
    if (event.target.files) {
      const file = event.target.files[0];
    }
  }

  register() {
    if (this.registrationForm.valid) {
      console.log("registracija " + this.registrationForm.valid);
      this.registrationService.registerUser(this.user).subscribe(
        (response: UserWithPin) => {
          console.log(response); //vracen korisnik koji ima pin
          if (response != null) {
            //otvori formu za unos pina 
            this.openPinDialog(response);
          } else {
            this.snackbar.open("Korisničko ime je zauzeto.", "",
              {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              }
            )
            this.user.username = "";
          }
        }
      );
    }
  }

  login() {
    if (this.loginForm.valid) {
      console.log("login " + this.loginForm.valid);
    }
  }

  openPinDialog(userWithPin: UserWithPin) {
    this.dialog.open(PinDialogComponent, {
      width: "500px",
      data: {
        user: userWithPin
      }
    });
  }
}
