import { Controller, Get, Post, UseGuards, Request, Body, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavouritesService } from './favourites.service';
import { FavouritesNavigation } from './favourites.navigation'
import { StocksService } from 'src/stocks/stocks.service';

@Controller('favourites')
@UseGuards(AuthGuard('jwt'))
export class FavouritesController {
  constructor(
    private readonly FavouritesService: FavouritesService,
    private readonly StocksService: StocksService,
  ) {}

  @Get(FavouritesNavigation.FAVINDEX)
  async userfaves(@Request() req, @Query() {date, currency}){
    const favs = await this.FavouritesService.getUserFavorites(req.user.id);
    const stocks = await this.StocksService.getStocks(favs.map(fav => fav.symbol).join(','), date, currency);
    return stocks;
  }  

  @Post(FavouritesNavigation.FAVCREATE)
  async createfav(@Body() { symbols, currency, date }, @Request() req){
    await this.FavouritesService.createUserFavourite(symbols, req.user.id);
    const data = await this.StocksService.getStocks(symbols.join(','), date, currency);
    return data;
  }

}
