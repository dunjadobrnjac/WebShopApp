import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserWithPin, UsernamePassword } from '../interface/interfaces'
import { RegistrationService } from '../services/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PinDialogComponent } from '../pin-dialog/pin-dialog.component';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { ImageService } from '../services/image.service';


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
    private router: Router,
    private imageService: ImageService) {

  }

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
      status: 1,
      avatar: null
    }

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

  avatarImageFile!: File;
  onFileSelected(event: any) {
    /* za dodavanje fajla prilikom registracije */
    if (event.target.files) {
      this.avatarImageFile = event.target.files[0];
    }
  }

  register() {
    if (this.registrationForm.valid) {
      console.log("registracija " + this.registrationForm.valid);
      //prvo ide cuvanje slike

      if (this.avatarImageFile != null) {
        const formData = new FormData();

        formData.append('slika', this.avatarImageFile);

        this.imageService.storeImageForUser(formData, "users").subscribe(
          response => {
            console.log("Image " + response);
            //ako je upisao sliku, onda moze dalje upisati korisnika, jer je vracena putanja do slike
            let image = JSON.parse(JSON.stringify(response));
            console.log(image.uploadedImages);
            this.user.avatar = image.uploadedImages[0];

            //hesiranje lozinke
            //this.user.password = bcrypt.hash(this.user.password, 10);
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
        );
      } else {
        //hesiranje lozinke
        //this.user.password = bcrypt.hash(this.user.password, 10);
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
  }

  login() {
    if (this.loginForm.valid) {
      console.log("login " + this.loginForm.valid);
      //this.passwordL = bcrypt.hash(this.passwordL, 10);
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
            /*this.loginForm.reset();
            this.loginForm.markAsUntouched();
            this.loginForm.markAsPristine();//ovo mi ne radi*/
            setTimeout(() => { window.location.reload(); }, 2000);
          } else if (response.pin != null) {
            console.log("generisan pin ->" + response.pin);
            this.snackbar.open("Uskoro ćete dobiti kod za aktivaciju na svom mejl nalogu. Dobijeni kod unesite u polja za unos koda za aktivaciju naloga.", "",
              {
                duration: 10000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              }
            )
            this.registrationService.sendEmail(JSON.stringify(response)).subscribe();
            //otvori formu za unos pina 
            this.openPinDialog(response, 1);
          } else if (response.status === 3) {
            this.snackbar.open("Vaš nalog je deaktiviran od strane administratora.", "",
              {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              }
            )
            /*this.loginForm.reset();
            this.loginForm.markAsUntouched();
            this.loginForm.markAsPristine();//ovo mi ne radi*/
            setTimeout(() => { window.location.reload(); }, 2000);
          } else {
            this.router.navigate(['/homepage-products']);
            localStorage.setItem("activeUserId", response.id.toString()); //cuva id prijavljenog korisnika
            console.log("activeUserID --> " + localStorage.getItem("activeUserId"));

            //da se promijeni da je korisnik prijavljen ( u header log out i za pristup drugim komponentama)
            this.registrationService.setIsLoggedIn(true);
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
