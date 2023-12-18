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

const routes: Routes = [
  { path: '', redirectTo: 'homepage-products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'shopping-card', component: ShoppingCardComponent },
  { path: 'homepage-products', component: HomepageProductsComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-support', component: UserSupportComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'my-purchases', component: MyPurchasesComponent },
  { path: 'new-item', component: NewItemComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
