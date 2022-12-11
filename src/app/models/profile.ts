import { FileHandle } from "./file-handle";

export class Profile {
    userId!: number;
    email!: string;
    firstName!: string;
    lastName!: string;
    userImage!: FileHandle;
}
