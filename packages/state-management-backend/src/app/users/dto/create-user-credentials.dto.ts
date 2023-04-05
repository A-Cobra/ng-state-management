import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class createUserCredentialsDto {
  user: User;

  email: string;

  password: string;

  role: string;
}
