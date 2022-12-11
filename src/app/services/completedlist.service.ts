import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';
import { CompletedItem } from '../models/completed-item';

@Injectable({
  providedIn: 'root'
})
export class CompletedlistService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  public getAllItems(): Observable<CompletedItem[]> {
    return this.http.get<CompletedItem[]>(`${this.BASE_URL}/api/completed_lists`);
  }

  public addToCompletedList(book: Book): Observable<Object> {
    return this.http.post(`${this.BASE_URL}/api/completed_lists/add`, book);
  }

  public deleteFromCompletedList(bookId: number): Observable<Object> {
    return this.http.delete(`${this.BASE_URL}/api/completed_lists/${bookId}`);
  }
}
