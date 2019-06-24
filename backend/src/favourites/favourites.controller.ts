import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavouritesService } from './favourites.service';
import { FavouritesNavigation } from './favourites.navigation'

@Controller('favourites')
@UseGuards(AuthGuard('jwt'))
export class FavouritesController {
  constructor(private readonly FavouritesService: FavouritesService) {}

  @Get(FavouritesNavigation.FAVINDEX)
  async userfaves(@Request() req){
    return this.FavouritesService.getUserFavorites(req.user);
  }  

  @Post(FavouritesNavigation.FAVCREATE)
  async createfav(@Body() body, @Request() req){
    console.log(req.user);
    return this.FavouritesService.createUserFavourite(body, req.user.id);
  }

}
