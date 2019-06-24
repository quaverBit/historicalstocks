import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favourite } from './favourites.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(Favourite)
    private readonly FavouriteRepository: Repository<Favourite>,
  ) {}
  
  async getUserFavorites(userId) {
    return await this.FavouriteRepository.find({ userId: userId });
  }
  
  async createUserFavourite(symbols, userId) {
    return await this.FavouriteRepository.save(symbols.map(symbol => ({symbol, userId})));
  }

}
