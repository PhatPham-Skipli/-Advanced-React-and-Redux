import { StringRequired } from "@/common/decorators";
import { IsEmail } from "class-validator";

export class CreateAccountDto {
    @StringRequired("Email")
    @IsEmail({}, { message: "Email must be a valid email address" })
    email!: string;

    @StringRequired("Username")
    username!: string;

    @StringRequired("Full Name")
    fullName!: string;

    @StringRequired("Password")
    password!: string;
}