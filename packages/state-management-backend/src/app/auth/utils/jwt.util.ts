import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { User } from '../../users/entities/user.entity';

export async function signToken(user: User): Promise<string> {
  const jwt = new JwtService();
  const { userId, role } = user;

  const data = { sub: userId, role };

  return jwt.signAsync(data, {
    secret: process.env.JWT_SECRET,
    expiresIn: '1d',
  });
}

export async function validateCode(
  hash: string,
  rawCode: string
): Promise<boolean> {
  const codeCorrect = await argon.verify(hash, rawCode);

  if (!codeCorrect) {
    throw new ForbiddenException('Codes does not match');
  }

  return true;
}

export async function hashData(data: string): Promise<string> {
  return argon.hash(data);
}
