import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8000/index.php?api=';
  private apiRoute = '';

  constructor(private http: HttpClient) { }

  /* getUsers(): Observable<any> {
    this.apiRoute = 'users';
    return this.http.get<any>(this.apiUrl + this.apiRoute);
  } */

  login(login: { username: string; password: string }): Observable<any> {
    this.apiRoute = 'login';
    return this.http.post<any>(this.apiUrl + this.apiRoute, login);
  }

  register(register: { username: string; password: string; passwordBis: string; email: string }): Observable<any> {
    this.apiRoute = 'register';
    return this.http.post<any>(this.apiUrl + this.apiRoute, register)
  }
}
