import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(
        private readonly dataSource:DataSource,
    ){
        super(User, dataSource.createEntityManager())
    };

    async findAllUsers(): Promise<User[]>{
        return this.find({})
    }

    async findOneUser(userId: string): Promise<User>{
        return this.findOne({where: {userId}})
    }
}