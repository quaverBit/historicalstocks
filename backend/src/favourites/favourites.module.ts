import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favourite } from './favourites.entity';
import { StocksService } from 'src/stocks/stocks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favourite])],
  providers: [FavouritesService, StocksService],
  controllers: [FavouritesController]
})
export class FavouritesModule {}
