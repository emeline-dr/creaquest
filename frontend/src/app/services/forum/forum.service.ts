import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = 'http://localhost:8000/index.php?api=forum/';
  private apiRoute = '';

  constructor(
    private http: HttpClient,
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

  /* Récupérer les posts */
  getAllPosts(): Observable<any> {
    this.apiRoute = 'posts';
    return this.http.get<any>(this.apiUrl + this.apiRoute);
  }

  /* Récupérer les posts */
  getPostsBySubjectId(subjectId: number): Observable<any> {
    this.apiRoute = `subjects/${subjectId}/posts`;
    return this.http.get<any>(this.apiUrl + this.apiRoute);
  }
}
