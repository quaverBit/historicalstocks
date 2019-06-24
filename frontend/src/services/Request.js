import axios from 'axios';
import UserService from './User';

class AuthenticatedRequest {
  request = axios.create({
    baseURL: 'http://localhost:3000/'
  });
  constructor() {
    this.request.interceptors.request.use((config) => {
      config.headers.authorization = UserService.getToken();
      return config;
    })

  }
}

class Request {
  request = axios.create({
    baseURL: 'http://localhost:3000',
  });
}

export { AuthenticatedRequest, Request }