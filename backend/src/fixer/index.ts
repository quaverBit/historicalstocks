import axios, { AxiosInstance } from 'axios';

// No ts support
const qs = require('qs');

class FixerClient {
  private request: AxiosInstance;
  private static accessKey = { access_key: process.env.API_KEY_FIXER };

  constructor() {
    this.request = axios.create({
      baseURL: 'http://data.fixer.io/api',
    });
  }



  async index(query?:any): Promise<any> {
    const { data } = await this.request.get('/latest', {params: {
      ...query,
      access_key: process.env.API_KEY_FIXER,
    },})
    return data;
  }

}

const client = new FixerClient();

export { client };