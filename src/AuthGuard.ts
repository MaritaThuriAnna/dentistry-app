// AuthGuards.ts:
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./app/auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(role: string): boolean {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');

    if (this.authService.isAuthenticated() && userRole === role) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}