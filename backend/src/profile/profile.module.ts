import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseAuthService } from '../firebase/firebase-auth.service';
import { Profile } from './entities/Profile';
import { Country } from './entities/Country';
import { Status } from './entities/Status';
import { AdditionalDetails } from './entities/AdditionalDetails';
import { HealthSafety } from './entities/HealthSafety';
import { TravelPersonalization } from './entities/TravelPersonalization';
import { TravelPreferences } from './entities/TravelPreferences';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Profile,
      Status,
      Country,
      AdditionalDetails,
      HealthSafety,
      TravelPersonalization,
      TravelPreferences,
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, FirebaseAuthService],
  exports: [ProfileService],
})
export class ProfileModule {}
