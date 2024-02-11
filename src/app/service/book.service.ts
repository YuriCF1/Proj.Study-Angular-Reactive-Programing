import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) { }

  getBooks(valueTyped: string): Observable<any> {
    const params = new HttpParams().append('q', valueTyped)
    return this.http.get(this.API, { params })
  }
}


