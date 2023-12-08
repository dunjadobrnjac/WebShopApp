import { Component } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ItemServiceService } from '../services/item-service.service';

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

  constructor(private snackBar: MatSnackBar, private formBuilder: FormBuilder,
    private itemService: ItemServiceService) { }
  ngOnInit() {
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

    //pretplata na brisanje artikla od strane vlasnika
    /*this.itemService.deletedItemSubject.subscribe((deletedItem) => {
      if (deletedItem.available == 1) {
        const index = this.itemsActive.indexOf(deletedItem);
        if (index !== -1) {
          this.itemsActive.splice(index, 1);
        }
      } else {
        const index = this.itemsFinished.indexOf(deletedItem);
        if (index !== -1) {
          this.itemsFinished.splice(index, 1);
        }
      }
      this.itemsAll = this.itemsActive.concat(this.itemsFinished);

      //trenutno obrise elemente iz niza, ali treba ponovo iz baze ucitati 
    })*/
  }

  user = {
    "firstName": "Dunja",
    "lastName": "Dobrnjac",
    "userName": "dunja123",
    "email": "dunja@gmail.com",
    "location": "Banja Luka",
    "telephone": "065/245-789",
    "avatar": "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"

  };

  /*za prikaz mat-card */
  itemsActive = [
    {
      "id": "1",
      "title": "Samsung Galaxy A4",
      "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
      "category": "Telefoni",
      "price": 1200,
      "status": "Nov",
      "location": "Banja Luka",
      "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
      "seller": "marko123",
      "contact": "065/215-963",
      "active": true
    },
    {
      "id": "2",
      "title": "Samsung Galaxy A04",
      "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
      "category": "Telefoni",
      "price": 1200,
      "status": "Nov",
      "location": "Banja Luka",
      "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
      "seller": "marko123",
      "contact": "065/215-963",
      "active": true
    },
    {
      "id": "3",
      "title": "Samsung Galaxy A4",
      "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
      "category": "Telefoni",
      "price": 1200,
      "status": "Nov",
      "location": "Banja Luka",
      "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
      "seller": "marko123",
      "contact": "065/215-963",
      "active": true
    },
    {
      "id": "4",
      "title": "Samsung Galaxy A04",
      "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
      "category": "Telefoni",
      "price": 1200,
      "status": "Nov",
      "location": "Banja Luka",
      "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
      "seller": "marko123",
      "contact": "065/215-963",
      "active": true
    }
  ];

  itemsFinished = [
    {
      "id": "1",
      "title": "Samsung Galaxy A4",
      "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
      "category": "Telefoni",
      "price": 1200,
      "status": "Nov",
      "location": "Banja Luka",
      "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
      "seller": "marko123",
      "contact": "065/215-963",
      "active": false
    },
    {
      "id": "2",
      "title": "Samsung Galaxy A04",
      "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
      "category": "Telefoni",
      "price": 1200,
      "status": "Nov",
      "location": "Banja Luka",
      "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
      "seller": "marko123",
      "contact": "065/215-963",
      "active": false
    },
    {
      "id": "3",
      "title": "Samsung Galaxy A4",
      "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
      "category": "Telefoni",
      "price": 1200,
      "status": "Nov",
      "location": "Banja Luka",
      "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
      "seller": "marko123",
      "contact": "065/215-963",
      "active": false
    },
    {
      "id": "4",
      "title": "Samsung Galaxy A04",
      "description": "Tekst za opis proizvoda. Ovde ce biti puno nekog teksta iz osipa, ali treba da se prikaze samo malo teksta u napocetnoj stranici i ..., a ostatak da se prikaze kada se klikne na sliku ili na dugme dalje.",
      "category": "Telefoni",
      "price": 1200,
      "status": "Nov",
      "location": "Banja Luka",
      "images": ["https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-3.jpg", "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a04s-4.jpg"],
      "seller": "marko123",
      "contact": "065/215-963",
      "active": false
    }
  ];

  itemsAll = this.itemsActive.concat(this.itemsFinished);




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
    if (this.changePasswordForm.valid) {
      this.snackBar.open("Lozinka je uspješno izmijenjena", '',
        {
          duration: 4000, /*ovo mi nije radilo, pa ima u providers */
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
    }
  }

  onChangePassword(): void {
    if (this.changePasswordForm.valid) {
      this.snackBar.open("Lozinka je uspješno izmijenjena");
    }
  }

  onChangeUserInfo(): void {

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
