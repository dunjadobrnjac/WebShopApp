import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinDialogComponent } from './pin-dialog.component';

describe('PinDialogComponent', () => {
  let component: PinDialogComponent;
  let fixture: ComponentFixture<PinDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PinDialogComponent]
    });
    fixture = TestBed.createComponent(PinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
