import { StringRequired } from '@/common/decorators';

export class CreateCommentDto {
    @StringRequired("Content")
    content: string;
}