// login.component.ts: 
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // loginForm: FormGroup;

  // constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  //   this.loginForm = this.formBuilder.group({
  //     email: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }

  // onSubmit(): void {
  //   const email = this.loginForm.get('email')!.value;
  //   const password = this.loginForm.get('password')!.value;
  
  //   this.authService.loginUser(email, password).subscribe({
  //     next: (response) => {
  //       console.log('Login successful:', response);
  //       const role = response.body; 
  //       if (role === 'DOCTOR') {
  //         window.location.href = '/doctor';
  //       } else if (role === 'PATIENT') {
  //         window.location.href = '/patient';
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error:', err);
  //       if (err.status === 401) {
  //         alert('Invalid login credentials');
  //       } else if (err.status === 0) {
  //         alert('Cannot connect to the server. Please try again later.');
  //       }
  //     },
  //   });
  // }
  
  

  // logout() {
  //   localStorage.removeItem('authToken');
  //   // redirect to login page
  //   window.location.href = '/login';
  // }

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  handleLogin() {
    // Placeholder for authentication logic
    this.router.navigate(['/doctor']);
  }
}
