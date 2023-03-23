import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

export class User {
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
    contactNumber: string;

    @Property()
    refreshToken?: string;
}
