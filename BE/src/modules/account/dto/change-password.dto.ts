import { StringRequired } from "@/common/decorators";

export class ChangePasswordDto {
    @StringRequired("Current Password")
    currentPassword: string;

    @StringRequired("New Password")
    newPassword: string;
}