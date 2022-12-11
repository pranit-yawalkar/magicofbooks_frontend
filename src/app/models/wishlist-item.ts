import { Book } from "./book";

export class WishlistItem {
    id!: number;
    book!: Book;
    date!: Date;
    userId!: number;
    wishlistId!: number;
}
