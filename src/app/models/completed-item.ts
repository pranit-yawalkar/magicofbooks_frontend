import { Book } from "./book";

export class CompletedItem {
    id!: number;
    book!: Book;
    date!: Date;
    userId!: number;
    completedListId!: number;
}
