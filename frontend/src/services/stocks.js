import {AuthenticatedRequest} from './Request';

class StockService extends AuthenticatedRequest {
  getStocks(symbols, date) {
    if(!symbols) return;
    const symbolsString = symbols.join(',');
    return this.request.get('/stocks/index', { params: {
      symbol: symbolsString,
      date,
    }})
  }
  addFavs(symbolsArray, date, currency) {
    return this.request.post('/favourites/create', { symbols: symbolsArray, date, currency });
  }

  getFavs(date, currency) {
    return this.request.get('/favourites/index', { params: { date, currency } });
  }

}

export default new StockService();