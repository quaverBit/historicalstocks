import axios from 'axios';
import UserService from './User';

class AuthenticatedRequest {
  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3000/'
    });
    this.request.interceptors.request.use((config) => {
      config.headers.authorization = UserService.getToken();
    })

  }
}

class Request {
  request = axios.create({
    baseURL: 'http://localhost:3000',
  });
}

export { AuthenticatedRequest, Request }