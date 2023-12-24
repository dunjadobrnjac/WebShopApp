import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { RegistrationService } from '../services/registration.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  collapsed = false;
  screenWidth = 0;

  constructor(private registrationService: RegistrationService) { }

  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    this.registrationService.isLoggedIn.subscribe(
      response => {
        if (response) {
          //if (localStorage.getItem("activeUserId") != null) {
          this.navData = [
            {
              routeLink: 'homepage-products',
              icon: 'fa fa-home',
              label: 'Proizvodi',
            },
            {
              routeLink: 'user-profile',
              icon: 'fa fa-user',
              label: 'Moj profil'
            },
            {
              routeLink: 'my-purchases',
              icon: 'fa fa-shopping-basket',
              label: 'Moje kupovine'
            },
            {
              routeLink: 'user-support',
              icon: 'fa fa-info-circle',
              label: 'Korisnička podrška'
            },
          ];
        } else {
          this.navData = [
            {
              routeLink: 'homepage-products',
              icon: 'fa fa-home',
              label: 'Proizvodi',
            },
            {
              routeLink: 'login',
              icon: 'fa fa-sign-in',
              label: 'Prijava/ Registracija'
            }
          ];
        }
      }
    );
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidenav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSidenav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.onToggleSidenav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  navData = [
    {
      routeLink: 'homepage-products',
      icon: 'fa fa-home',
      label: 'Proizvodi',
    },
    {
      routeLink: 'login',
      icon: 'fa fa-sign-in',
      label: 'Prijava/ Registracija'
    }
  ];


}
