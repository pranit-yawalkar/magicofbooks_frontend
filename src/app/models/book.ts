import { FileHandle } from "./file-handle";

export class Book {
    bookId!: number;
    bookName!: string;
    bookDesc!: string;
    author!: string;
    price!: number;
    quantity!: number;
    category!: any;
    bookImage!: FileHandle;
    createdDate!: string;
    modifiedDate!: string;
}
