import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { RegistrationService } from '../services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  headerText: string = "Prijava / Registracija";
  headerIcon: string = "login";
  //headerLink: string = "/login";

  totalPrice: number = 0;
  isLoggedIn: boolean = false;

  constructor(private shoppingCartService: ShoppingCartService,
    private registrationService: RegistrationService,
    private router: Router) { }
  ngOnInit(): void {
    this.shoppingCartService.cartItemsSubject.subscribe(() => {
      this.totalPrice = this.shoppingCartService.getTotalPrice();
    });
    this.registrationService.isLoggedIn.subscribe(
      value => {
        this.isLoggedIn = value;
        if (value) { //korisnik prijavljen
          this.headerIcon = "logout";
          this.headerText = "Odjava";
        } else {
          this.headerIcon = "login";
          this.headerText = "Prijava / Registracija";
        }
      }
    );
  }

  onLogClick() {
    if (this.isLoggedIn) {

      localStorage.removeItem("activeUserId"); //uklanja korisnika jer radi odjavu
      this.registrationService.setIsLoggedIn(false);
    }
    console.log("/***/");
    this.router.navigate(['/login']);
  }

  getHeaderClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }
}
