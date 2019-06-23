import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favourite } from './favourites.entity';
import { User } from '../auth/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favourite])],
  providers: [FavouritesService],
  controllers: [FavouritesController]
})
export class FavouritesModule {}
