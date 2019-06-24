import { Controller, Get, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StocksNavigation } from './stocks.navigation'
import { Decimal } from 'decimal.js';
import { client as fixerClient } from '../fixer';
import { client as wtdClient } from '../wtd';

@Controller('stocks')
export class StocksController {

  @Get(StocksNavigation.INDEX)
  @UseGuards(AuthGuard('jwt'))
  async getStocks(@Query() query){
    const { symbol, date, currency } = query;
    const [fixerData, wtdData] = await Promise.all([
      fixerClient.index({ date, currency }),
      wtdClient.index({ symbol, date }),
    ]);
    const USDRate = fixerData.rates.USD;
    const otherRate = new Decimal(fixerData.rates[currency]);
    Object.keys(wtdData).forEach((stockName) => {
      const stock = wtdData[stockName]
      Object.keys(stock).forEach((value) => {
        stock[value] = otherRate.times(stock[value]).dividedBy(USDRate);
      })
    })
    return wtdData;
  }
}
