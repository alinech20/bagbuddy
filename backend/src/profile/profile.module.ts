import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/Profile';
import { Gender } from './entities/Gender';
import { Country } from './entities/Country';
import { Status } from './entities/Status';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Status, Gender, Country])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
