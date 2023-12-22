import { Component } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ItemServiceService } from '../services/item-service.service';
import { UserService } from '../services/user.service';
import { ItemService } from '../services/item.service';
import { ImageService } from '../services/image.service';
import { User, Item } from '../interface/interfaces';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  changePasswordForm!: FormGroup; /*forma za izmjenu lozinke */
  changeUserInfoForm!: FormGroup; /*form za izmjenu podataka */
  submittedPassword: boolean = false;
  submittedInfo: boolean = false;

  activeUser!: User;
  itemsActive: Item[] = [];
  itemsFinished: Item[] = [];
  itemsAll: Item[] = [];

  constructor(private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private itemService: ItemServiceService,
    private iitemService: ItemService,
    private userService: UserService,
    private imageService: ImageService) { }

  ngOnInit() {
    const ls = localStorage.getItem("activeUserId");
    const activeUserId = ls != null ? parseInt(ls, 10) : 0;
    this.userService.getUserById(activeUserId).subscribe(
      user => {
        this.activeUser = user;

        //učitavanje aktivnih oglasa aktivnog korisnika
        this.iitemService.getActiveItems(user.id).subscribe(
          items => {
            for (let item of items) {
              this.imageService.getImagesForItem(item.id).subscribe(
                data => {
                  let s = JSON.stringify(data);
                  item.images = JSON.parse(s).images;
                }
              )
            }

            this.itemsActive = this.itemsActive.concat(items);
          }
        );

        //učitavanje zavšenih oglasa aktivnog korisnika
        this.iitemService.getFinishedItems(user.id).subscribe(
          items => {
            for (let item of items) {
              this.imageService.getImagesForItem(item.id).subscribe(
                data => {
                  let s = JSON.stringify(data);
                  item.images = JSON.parse(s).images;
                }
              )
            }

            this.itemsFinished = this.itemsFinished.concat(items);
            this.itemsAll = this.itemsActive.concat(this.itemsFinished);
          }
        );
      }
    );

    /*validacija kod promjene lozinke */
    this.changePasswordForm = this.formBuilder.group({
      oldPasswordControl: ['', [Validators.required]],
      newPasswordControl: ['', [Validators.required, Validators.minLength(8)]],
      confirmPasswordControl: ['', [Validators.required, Validators.minLength(8)]],
    })

    /*validacija za izmjenu informacija o korisniku */
    this.changeUserInfoForm = this.formBuilder.group({
      firstNameControl: ['', [Validators.required]],
      lastNameControl: ['', [Validators.required]],
      telephoneControl: ['', [Validators.required]],
      locationControl: ['', [Validators.required]],
    })

  }


  /*za odabir slike avatara kod izmjene profila */
  onFileSelected(event: any) {

  }

  /* za mail ispis poruke ako nije validan */
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  /* za izmjenu lozinke */
  hideOld = true;
  hideNew1 = true;
  hideNew2 = true;

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  arePasswordsEqual(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.changePasswordForm.controls['confirmPasswordControl'].setErrors({ passwordsNotMatch: true });
    }
  }

  onChangePassword(): void {
    if (this.changePasswordForm.valid) {
      this.userService.updatePassword(this.activeUser.id, this.oldPassword, this.newPassword).subscribe(
        response => {
          if (response) {
            this.snackBar.open("Lozinka je uspješno izmijenjena.", '',
              {
                duration: 4000, /*ovo mi nije radilo, pa ima u providers */
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              })
          } else {
            this.snackBar.open("Ažuriranje nije moguće. Stara lozinka nije odgovarajuća.", '',
              {
                duration: 4000, /*ovo mi nije radilo, pa ima u providers */
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              })
          }
        }
      );
    }
  }

  onChangeUserInfo(): void {
    console.log("klinuo na dugme");
    this.userService.updateUser(this.activeUser).subscribe(
      user => {
        if (user != null) {
          this.snackBar.open("Podaci su uspješno ažurirani.", '',
            {
              duration: 4000, /*ovo mi nije radilo, pa ima u providers */
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
        } else {
          this.snackBar.open("Desila se greška. Pokušajte kasnije ponovo.", '',
            {
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
        }
      }
    );
  }
}

/* za mail ispis poruke ako nije validan */
export class MyErrorStateMatcher implements MyErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid &&
      (control.dirty || control.touched || isSubmitted));
  }
}
