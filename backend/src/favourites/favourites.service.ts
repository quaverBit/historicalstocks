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
  
  async getUserFavorites(user) {
    await this.FavouriteRepository.save({ symbol: 'TSLA', userId: user.id })
    return await this.FavouriteRepository.find({ userId: user.id });
  }

}
