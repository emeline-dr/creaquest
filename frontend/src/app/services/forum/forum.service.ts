import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = 'https://creaquest-back.up.railway.app/forum/';
  private apiRoute = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /* Récupérer les catégories */
  getAllCategories(): Observable<any> {
    this.apiRoute = 'categories';
    return this.http.get<any>(this.apiUrl + this.apiRoute);
  }

  /* Récupérer les sujets */
  getAllSubjects(): Observable<any> {
    this.apiRoute = 'subjects';
    return this.http.get<any>(this.apiUrl + this.apiRoute);
  }

  /* Récupérer les sujets par ID de catégorie */
  getSubjectsByCategoryId(categoryId: number): Observable<any> {
    this.apiRoute = `categories/${categoryId}/subjects`;
    return this.http.get<any>(this.apiUrl + this.apiRoute);
  }

  /* Nouveau sujet + post allant avec */
  createSubjectWithPost(categoryId: number, title: string, content: string): Observable<any> {
    const authorId = this.authService.getUserId();
    const data = { categoryId, title, content, authorId };

    this.apiRoute = 'subjects';
    return this.http.post<any>(this.apiUrl + this.apiRoute, data);
  }

  /* Récupérer les posts */
  getAllPosts(): Observable<any> {
    this.apiRoute = 'posts';
    return this.http.get<any>(this.apiUrl + this.apiRoute);
  }

  /* Récupérer le post par id */
  getPostsBySubjectId(subjectId: number): Observable<any> {
    this.apiRoute = `subjects/${subjectId}/posts`;
    return this.http.get<any>(this.apiUrl + this.apiRoute);
  }

  /* Nouveau Message dans un sujet */
  addPost(postData: { subjectId: number, content: string }): Observable<any> {
    const authorId = this.authService.getUserId();
    const data = { ...postData, authorId };

    this.apiRoute = 'posts';
    return this.http.post<any>(this.apiUrl + this.apiRoute, data);
  }
}
