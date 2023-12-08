import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageProductsComponent } from './homepage-products.component';

describe('HomepageProductsComponent', () => {
  let component: HomepageProductsComponent;
  let fixture: ComponentFixture<HomepageProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageProductsComponent]
    });
    fixture = TestBed.createComponent(HomepageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
