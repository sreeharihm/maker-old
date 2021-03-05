import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor( private router: Router, private renderer: Renderer2, private authService: AuthService) { 
    this.renderer.addClass(document.body, 'side_menu_hide');
    this.renderer.removeClass(document.body, 'side_menu_show');
  }

  redirectToHome() {
    this.router.navigate(['/home']);
    if(this.email.length > 0 && this.password.length > 0) {
    this.authService.SignIn(this.email,this.password);
    }
  }

  ngOnDestroy() {
    this.renderer.addClass(document.body, 'side_menu_show');
    this.renderer.removeClass(document.body, 'side_menu_hide');
  }

}
