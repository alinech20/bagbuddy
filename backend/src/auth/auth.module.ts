import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from '../profile/profile.module';
import { FirebaseAuthService } from '../firebase/firebase-auth.service';

@Module({
  imports: [ConfigModule, ProfileModule],
  controllers: [AuthController],
  providers: [FirebaseAuthService],
})
export class AuthModule {}
