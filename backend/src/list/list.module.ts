import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/List';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { FirebaseAuthService } from '../firebase/firebase-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  controllers: [ListController],
  providers: [ListService, FirebaseAuthService],
  exports: [],
})
export class ListModule {}
