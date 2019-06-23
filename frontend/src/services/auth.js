import { Request } from './Request';

class Auth extends Request {
  constructor() {
    super();
  }
  register({ name, email, password }) {
    return this.request.post('/auth/register', { name, email, password})
  }

  login({ email, password }) {
    return this.request.post('/auth/login', { email, password });
  }
}

export default new Auth();