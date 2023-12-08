import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponentComponent } from './item-component.component';

describe('ItemComponentComponent', () => {
  let component: ItemComponentComponent;
  let fixture: ComponentFixture<ItemComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemComponentComponent]
    });
    fixture = TestBed.createComponent(ItemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
