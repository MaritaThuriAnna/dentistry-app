import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environment/environment';

interface User {
  userId: string;
  surname: string;
  forname: number;
  email: string;
  telNr: string;
  role: string;
  profilePictureUrl: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/User/Login`;
  private userDetailsUrl = `${environment.apiUrl}/User/findByEmail`; 

  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, 
      { userEmail: email, userPassword: password }, 
      { observe: 'response' }
    )
  }

  fetchUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.userDetailsUrl}?email=${email}`).pipe(
      tap(user => {
        console.log("User details fetched:", user);
        this.setLoggedInUser(user.userId);
      })
    );
  }
  

  getLoggedInUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  setLoggedInUser(userId: string) {
    localStorage.setItem('userId', userId);
  }

  logout() {
    localStorage.removeItem('userId');
  }
  
}
