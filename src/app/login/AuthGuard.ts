// AuthGuards.ts:
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('authToken')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}