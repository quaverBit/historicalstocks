import { Controller, Get, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StocksNavigation } from './stocks.navigation'
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly StocksService: StocksService){}

  @Get(StocksNavigation.INDEX)
  @UseGuards(AuthGuard('jwt'))
  async getStocks(@Query() { symbol, date, currency }){
    return await this.StocksService.getStocks(symbol, date, currency);
  }
}
