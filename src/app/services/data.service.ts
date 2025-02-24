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

  getUsers(): Observable<any> {
    this.apiRoute = 'users';
    return this.http.get<any>(this.apiUrl + this.apiRoute);
  }
}
