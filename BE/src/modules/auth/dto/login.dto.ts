import { StringRequired } from "@/common/decorators";

export class LoginDto {
    @StringRequired("Username or Email")
    identifier!: string;

    @StringRequired("Password")
    password!: string;
}