import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  login(): void {
    // ⚠️ Mock login (à remplacer plus tard par backend)
    if (this.email === 'admin@movie.com' && this.password === '1234') {
      this.router.navigate(['/movies']);
    } else {
      this.error = 'Invalid email or password';
    }
  }
}


