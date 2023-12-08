import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  totalPrice: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }
  ngOnInit(): void {
    this.shoppingCartService.cartItemsSubject.subscribe(() => {
      this.totalPrice = this.shoppingCartService.getTotalPrice();
    });
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
