import axios, { AxiosInstance, AxiosResponse } from 'axios';

class WtdClient {
  request: AxiosInstance;
  private static accessKey = { api_token: 'z57kDImo1DkTMx4AlcwBD1FaRYS578lDfnIS6VWKOT5WW8BF3QLEiuAkRYzf'};

  constructor() {
    this.request = axios.create({
      baseURL: 'https://api.worldtradingdata.com/api/v1',
    });
  }


  async index(query?: any) {
    const symbol:[String] = query.symbol.split(',');
    const { date } = query;
    const apiUri = date ? 'history_multi_single_day' : '/stock'; 

    // 2 symbol request workaround
    const requests = [];
    const step = 2;
    for(let i = 0; i<symbol.length; i+= step) {
      requests.push(this.request.get(apiUri, { params: {
        symbol: symbol.slice(i, i + 5).join(','),
        date,
        ...WtdClient.accessKey,
      }}))
    }
    const responses = await Promise.all(requests);
    return responses.reduce(
      (acc, { data: { data: response } }, index) => {
        return { ...acc, ...response }
      },
      {},
    );
  }

};

const client = new WtdClient();

export { client };