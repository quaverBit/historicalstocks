import { Injectable } from '@nestjs/common';
import { Decimal } from 'decimal.js';
import { client as fixerClient } from '../fixer';
import { client as wtdClient } from '../wtd';

@Injectable()
export class StocksService {
  async getStocks(symbol: string, date: string, currency: string) {
    const [fixerData, wtdData] = await Promise.all([
      fixerClient.index({ date, currency }),
      wtdClient.index({ symbol, date }),
    ]);
    const USDRate = fixerData.rates.USD;
    const otherRate = new Decimal(fixerData.rates[currency]);
    Object.keys(wtdData).forEach((stockName) => {
      const stock = wtdData[stockName]
      Object.keys(stock).forEach((value) => {
        if (value !== 'volume') stock[value] = otherRate.times(stock[value]).dividedBy(USDRate).toFixed(2);
      })
    })
    return wtdData;
  }

}
