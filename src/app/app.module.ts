import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatTabsModule } from '@angular/material/tabs'
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';

import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { HomepageProductsComponent } from './homepage-products/homepage-products.component';
import { SearchComponent } from './search/search.component';
import { FilterProductComponent } from './filter-product/filter-product.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { UserSupportComponent } from './user-support/user-support.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CarouselModule } from './carousel/carousel.module';
import { CommentsModule } from "./comments/comments.module";
import { HttpClientModule } from '@angular/common/http';
import { ItemComponentComponent } from './item-component/item-component.component';
import { MyPurchasesComponent } from './my-purchases/my-purchases.component';

import { MomentModule } from 'ngx-moment';
import { NewItemComponent } from './new-item/new-item.component';
import { PinDialogComponent } from './pin-dialog/pin-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        BodyComponent,
        SidenavComponent,
        LoginComponent,
        HomepageProductsComponent,
        SearchComponent,
        FilterProductComponent,
        UserProfileComponent,
        ShoppingCardComponent,
        ConfirmDeleteDialogComponent,
        UserSupportComponent,
        ProductDetailsComponent,
        ItemComponentComponent,
        MyPurchasesComponent,
        NewItemComponent,
        PinDialogComponent,
    ],
    providers: [MatPaginatorIntl,
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatSlideToggleModule,
        MatChipsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule, MatToolbarModule, MatButtonModule, FlexLayoutModule,
        MatFormFieldModule, MatInputModule, MatSelectModule,
        MatTooltipModule, MatTabsModule, MatRippleModule,
        MatSnackBarModule, MatStepperModule, MatDialogModule,
        MatTreeModule,
        CarouselModule,

        CommentsModule, HttpClientModule,
        MomentModule,

    ]
})
export class AppModule { }
