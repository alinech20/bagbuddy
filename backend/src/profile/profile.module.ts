import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/Profile';
import { Country } from './entities/Country';
import { Status } from './entities/Status';
import { FirebaseAuthService } from '../firebase/firebase-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Status, Country])],
  controllers: [ProfileController],
  providers: [ProfileService, FirebaseAuthService],
  exports: [ProfileService],
})
export class ProfileModule {}
