import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageProductsComponent } from './homepage-products/homepage-products.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { UserSupportComponent } from './user-support/user-support.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MyPurchasesComponent } from './my-purchases/my-purchases.component';
import { NewItemComponent } from './new-item/new-item.component';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'homepage-products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'shopping-card',
    component: ShoppingCardComponent,
    canActivate: [GuardService]
  },
  { path: 'homepage-products', component: HomepageProductsComponent },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [GuardService]
  },
  {
    path: 'user-support',
    component: UserSupportComponent,
    canActivate: [GuardService]
  },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  {
    path: 'my-purchases',
    component: MyPurchasesComponent,
    canActivate: [GuardService]
  },
  {
    path: 'new-item',
    component: NewItemComponent,
    canActivate: [GuardService]
  },
  { path: '**', redirectTo: 'homepage-products', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
