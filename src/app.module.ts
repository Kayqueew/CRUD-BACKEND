import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UserModule), // Add forwardRef to avoid circular dependency
    forwardRef(() => AuthModule), // Add forwardRef to avoid circular dependency
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
