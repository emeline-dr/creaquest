import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenKey = 'token';

  constructor(private router: Router) { }

  getAuthToken(): string {
    return localStorage.getItem(this.tokenKey)!
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/home']);
  }

  getDecodedToken(): any {
    const token = this.getAuthToken();
    return token ? jwtDecode(token) : null;
  }
}
