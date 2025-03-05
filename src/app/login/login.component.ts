// login.component.ts: 
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.loginUser(email, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('authToken', response.body.token || '');

        

        if (response.status === 200) {
          this.authService.fetchUserByEmail(email).subscribe({
            next: (user) => {
              console.log('User details:', user);
              if (response.body.role === 'DENTIST') {
                this.router.navigate(['/doctor/home']);
              } else if (response.body.role === 'PATIENT') {
                this.router.navigate(['/patient']);
              }
            },
            error: (err) => {
              console.error('Error fetching user details:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid credentials or server issue.');
      }
    });
  }

}
