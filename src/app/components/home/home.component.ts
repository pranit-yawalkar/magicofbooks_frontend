import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { CompletedlistService } from 'src/app/services/completedlist.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books!: any;
  book!: Book;

  constructor(private taostr: ToastrService, private bookService: BookService, private wishlistService: WishlistService, private completedService: CompletedlistService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.books = data;
    }, error => {
      console.log(error);
    })
  }

  addToWishlist(bookId: number) {
    this.book = new Book();
    this.book.bookId = bookId;
    this.wishlistService.addToWishlist(this.book).subscribe(data => {
      this.taostr.success("Book add to wishlist");
      console.log(data);
    }, err => {
      if (err.status === 401) {
        this.taostr.error("Please login to continue");
      }

      if (err.status == 400) {
        this.taostr.error("Book already added to the wishlist");
      }
    })
  }

  addToCompleted(bookId: number) {
    this.book = new Book();
    this.book.bookId = bookId;
    this.completedService.addToCompletedList(this.book).subscribe(data => {
      this.taostr.success("Book add to completed books");
      console.log(data);
    }, err => {
      if (err.status === 401) {
        this.taostr.error("Please login to continue");
      }

      if (err.status == 400) {
        this.taostr.error("Book already added to the completed list");
      }
    })
  }
}
