import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  public getAllBooks(): Observable<Object> {
    return this.http.get(this.BASE_URL + "/api/books", { headers: { skip: "true" } });
  }
}
