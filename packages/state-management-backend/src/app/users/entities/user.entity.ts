import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ abstract: true })
export abstract class User {
    @PrimaryKey()
    userId: string = v4();

    @Property()
    role: string;

    @Property()
    username: string;

    @Property()
    name: string;

    @Property()
    lastname: string;

    @Property()
    picture: string;

    @Property()
    email: string;

    @Property({ hidden: true })
    password: string;

    @Property()
    isLoggedIn: boolean;

    @Property()
    contact_number: string;

    @Property()
    refreshToken?: string;
}
