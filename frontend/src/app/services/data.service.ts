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

  /* Tous les Users */
  getAllUsers(): Observable<any> {
    this.apiRoute = 'users';
    return this.http.get<any>(this.apiUrl + this.apiRoute);
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

  getCompletedWritingTasks(): Observable<any> {
    this.apiRoute = 'completed-tasks/writing/';
    const userId = this.authService.getUserId();
    return this.http.get<any>(this.apiUrl + this.apiRoute + userId);
  }

  validateWritingTasks(userId: number, taskId: number): Observable<any> {
    this.apiRoute = `tasks/validation/writing/${userId}/${taskId}`;
    return this.http.post<any>(this.apiUrl + this.apiRoute, {});
  }

  /* Tâches Lecture */
  getReadingTasks(): Observable<any> {
    this.apiRoute = 'tasks/reading/';
    const userId = this.authService.getUserId();
    return this.http.get<any>(this.apiUrl + this.apiRoute + userId);
  }

  getCompletedReadingTasks(): Observable<any> {
    this.apiRoute = 'completed-tasks/reading/';
    const userId = this.authService.getUserId();
    return this.http.get<any>(this.apiUrl + this.apiRoute + userId);
  }

  validateReadingTasks(userId: number, taskId: number): Observable<any> {
    this.apiRoute = `tasks/validation/reading/${userId}/${taskId}`;
    return this.http.post<any>(this.apiUrl + this.apiRoute, {});
  }

  /* Tâches Dessin */
  getDrawingTasks(): Observable<any> {
    this.apiRoute = 'tasks/drawing/';
    const userId = this.authService.getUserId();
    return this.http.get<any>(this.apiUrl + this.apiRoute + userId);
  }

  getCompletedDrawingTasks(): Observable<any> {
    this.apiRoute = 'completed-tasks/drawing/';
    const userId = this.authService.getUserId();
    return this.http.get<any>(this.apiUrl + this.apiRoute + userId);
  }

  validateDrawingTasks(userId: number, taskId: number): Observable<any> {
    this.apiRoute = `tasks/validation/drawing/${userId}/${taskId}`;
    return this.http.post<any>(this.apiUrl + this.apiRoute, {});
  }

  /* Récupération Music */
  getMusic(): Observable<any> {
    this.apiRoute = 'music';
    return this.http.get<any>(this.apiUrl + this.apiRoute);
  }
}
