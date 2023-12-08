import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('container') container: ElementRef | undefined;

  togglePanel(isSignUp: boolean): void {
    if (isSignUp) {
      this.container?.nativeElement.classList.add('right-panel-active');
    } else {
      this.container?.nativeElement.classList.remove('right-panel-active');
    }
  }

  avatarImageFile: any;
  onFileSelected(event: any) {
    /* za dodavanje fajla prilikom registracije */
    if (event.target.files) {
      const file = event.target.files[0];
    }
  }

  visible: boolean = false;
  viewpass() {
    this.visible = !this.visible;
  }

}
