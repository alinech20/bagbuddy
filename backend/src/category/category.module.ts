import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/Category';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { FirebaseAuthService } from '../firebase/firebase-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, FirebaseAuthService],
  exports: [],
})
export class CategoryModule {}
