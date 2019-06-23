import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { client as fixerClient } from '../fixer';
import { client as wtdClient } from '../wtd';

@Controller('stocks')
export class StocksController {

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getStocks(@Query() query){
    // const data = await fixerClient.index(query);
    const data = await wtdClient.index(query);
    return data;
  }
}
