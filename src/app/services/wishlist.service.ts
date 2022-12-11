import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WishlistItem } from '../models/wishlist-item';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  public getWishlistItems(): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(this.BASE_URL + "/api/wishlists");
  }

  public addToWishlist(wishlistItem: any): Observable<Object> {
    return this.http.post(this.BASE_URL + "/api/wishlists/add", wishlistItem);
  }
}
