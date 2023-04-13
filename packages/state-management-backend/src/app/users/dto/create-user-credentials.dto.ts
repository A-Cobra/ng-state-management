import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class createUserCredentialsDto {
  userId: string;

  email: string;

  password: string;

  role: string;
}
