import { Module } from '@nestjs/common';

import { UserRepository } from './repositories/user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { OptimusService } from 'src/shared/services/optimus-api/optimus.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, OptimusService],
  exports: [UsersService],
})
export class UsersModule {}
