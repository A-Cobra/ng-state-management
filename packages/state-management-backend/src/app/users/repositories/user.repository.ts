import { ConflictException, Injectable } from "@nestjs/common";
import { Sign } from "crypto";
import { DataSource, Repository } from "typeorm";
import { SignInDto } from "../../auth/dto/sigin.dto";
import { JwtInfo } from "../../auth/interfaces/jwtinfo.type";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(
        private readonly dataSource:DataSource,
    ){
        super(User, dataSource.createEntityManager())
    };

    async createOneUser(
        userInfo: CreateUserDto,
      ): Promise<User> {
        try {
          return this.save(userInfo);
        } catch (error) {
          if (+error.code === 23505) {  //remove this magic number for duplicate user creation
            throw new ConflictException(error.detail);
          } else {
            throw new Error(error);
          }
        }
      }

    async findAllUsers(): Promise<User[]>{
      return this.find({})
    }

    async findOneUser(options: string | SignInDto ): Promise<User>{
      if(typeof options === 'string'){
        return this.findOne({where: {userId: options}})
      }else{
        return this.findOne({where: {username: options.username}})
      }
    }

    
    async updateOneUser(user: User, updatedUserInfo: UpdateUserDto) {
      return this.update(user.userId, { ...updatedUserInfo });
    }
    
    async deleteOneUser(userId: string) {
      return this.delete(userId);
    }

    async updateLogInStatus(user: User, state: boolean) {
      await this.update(user.userId, {
        isLoggedIn: state,
      });

      return {...user, isLoggedIn: state}
    }

    async updateRole(user: User, newRole: string) {
      user.role = newRole;
    return this.save(user);
  }

}