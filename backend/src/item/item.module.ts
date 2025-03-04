import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/Item';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { FirebaseAuthService } from '../firebase/firebase-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemController],
  providers: [ItemService, FirebaseAuthService],
  exports: [],
})
export class ItemModule {}
