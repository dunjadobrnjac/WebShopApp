import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

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

  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
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


}
