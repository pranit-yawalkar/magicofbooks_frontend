import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { WishlistItem } from 'src/app/models/wishlist-item';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistItems!: WishlistItem[];

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.getWishlistItems();
  }

  getWishlistItems() {
    this.wishlistService.getWishlistItems().subscribe(data => {
      console.log(data);
      this.wishlistItems = data;
    }, err => {
      console.log(err);
    })
  }

}
