import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule], // Aqui você deve ter o AuthModule
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
