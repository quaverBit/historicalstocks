import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavouritesService } from './favourites.service';

@Controller('favourites')
export class FavouritesController {
  constructor(private readonly FavouritesService: FavouritesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async userfaves(@Request() req){
    return this.FavouritesService.getUserFavorites(req.user);
  }  

}
