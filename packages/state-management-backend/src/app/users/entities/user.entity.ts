import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn({name: 'user_id'})
    userId: string;

    @Column({name: 'username'})
    username: string;

    @Column({name: 'password'})
    password: string;
    
    @Column({name: 'is_logged_in', default: false})
    isLoggedIn: boolean

    @Column({name: 'role', default: 'client'})
    role: string
}
