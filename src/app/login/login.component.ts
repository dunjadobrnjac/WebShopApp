import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserWithPin, UsernamePassword } from '../interface/interfaces'
import { RegistrationService } from '../services/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PinDialogComponent } from '../pin-dialog/pin-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router) { }

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

    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      city: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{3}\/\d{3}-\d{3}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });

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
            this.openPinDialog(response, 2);
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
      this.registrationService.loginUser(this.usernameL, this.passwordL, "").subscribe(
        (response: UserWithPin) => {
          console.log(" ->" + JSON.stringify(response));
          if (response == null) {
            this.snackbar.open("Uneseni parametri nisu validni.", "",
              {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              }
            )
            this.loginForm.reset();
            this.loginForm.markAsUntouched();
            this.loginForm.markAsPristine();//ovo mi ne radi
          } else if (response.pin != null) {
            console.log("generisan pin ->" + response.pin);
            //otvori formu za unos pina 
            this.openPinDialog(response, 1);
          } else {
            this.router.navigate(['/homepage-products']);
            localStorage.setItem("activeUserId", response.id.toString()); //cuva id prijavljenog korisnika
            console.log("activeUserID --> " + localStorage.getItem("activeUserId"));
          }
        }
      );
    }
  }

  openPinDialog(userWithPin: UserWithPin, page: number) { //prijava 1, registracija 2
    this.dialog.open(PinDialogComponent, {
      width: "500px",
      data: {
        user: userWithPin,
        page: page
      }
    });
  }
}
