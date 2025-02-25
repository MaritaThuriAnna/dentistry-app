// auth.service.ts:
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

// from: https://dev.to/samuelwachira/angular-authentication-route-guards-4joe

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiUrl: string = 'http://localhost:8082/User';

  constructor(private http: HttpClient) { }

  // loginUser(email: string, password: string) {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   const body = new HttpParams().set('userEmail', email).set('userPassword', password);
  
  //   return this.http.post(this.apiUrl + 'User/Login', body.toString(), { headers, observe: 'response' });
  // }
  loginUser(userEmail: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/Login?userEmail=${userEmail}&userPassword=${password}`; // Construct URL properly
    return this.http.post(url, { userEmail: userEmail, userPassword: password }); // Match the backend parameter names
  }
  
  public isAuthenticated() : boolean {
    const token = localStorage.getItem('authToken');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }
}
