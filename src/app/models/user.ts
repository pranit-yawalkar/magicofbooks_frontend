import { FileHandle } from "./file-handle";

export class User {
    email!: string;
    firstName!: string;
    lastName!: string;
    password!: string;
    userImage!: FileHandle;
}