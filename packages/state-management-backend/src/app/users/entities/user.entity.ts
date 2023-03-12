import { Exclude } from 'class-transformer';

export class User {
    userId: string;

    username: string;

    @Exclude({ toPlainOnly: true })
    password: string;

    isLoggedIn: boolean;

    role: string;

    refresh_token?: string;
}
