import { OnEvent } from '@nestjs/event-emitter';
import { createUserCredentialsDto } from '../dto/create-user-credentials.dto';
import { UsersDirectoryService } from '../services/users-directory.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersListener {
  constructor(private readonly usersDirectory: UsersDirectoryService) {}

  @OnEvent('user.created')
  handleOrderCreatedEvent(payload: createUserCredentialsDto) {
    console.log('sup');
    this.usersDirectory.createUserCredentials(payload);
  }
}
