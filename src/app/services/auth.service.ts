import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/User/Login`;

  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string): Observable<any> {
    console.log("in function loginUser", email, password)
    return this.http.post(`${this.apiUrl}`, 
      { userEmail: email, userPassword: password }, 
      { observe: 'response' }
    );
  }
  
}
