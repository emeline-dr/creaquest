import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8000/index.php?api=';
  private apiRoute = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /* Connexion */
  login(login: { username: string; password: string }): Observable<any> {
    this.apiRoute = 'login';
    return this.http.post<any>(this.apiUrl + this.apiRoute, login);
  }

  /* Inscription */
  register(register: { username: string; password: string; passwordBis: string; email: string }): Observable<any> {
    this.apiRoute = 'register';
    return this.http.post<any>(this.apiUrl + this.apiRoute, register)
  }

  /* Infos User */
  getUser(): Observable<any> {
    this.apiRoute = 'users/';
    const userId = this.authService.getUserId();
    return this.http.get<any>(this.apiUrl + this.apiRoute + userId);
  }

  /* Tâches Écriture */
  getWritingTasks(): Observable<any> {
    this.apiRoute = 'tasks/writing/';
    const userId = this.authService.getUserId();
    return this.http.get<any>(this.apiUrl + this.apiRoute + userId);
  }

  /* Tâches Lecture */
  getReadingTasks(): Observable<any> {
    this.apiRoute = 'tasks/reading/';
    const userId = this.authService.getUserId();
    return this.http.get<any>(this.apiUrl + this.apiRoute + userId);
  }

  /* Tâches Dessin */
  getDrawingTasks(): Observable<any> {
    this.apiRoute = 'tasks/drawing/';
    const userId = this.authService.getUserId();
    return this.http.get<any>(this.apiUrl + this.apiRoute + userId);
  }
}
