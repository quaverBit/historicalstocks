class User {
  user = null;
  token = null;

  login(user, token) {
    console.log(user, token);
    this.user = user;
    this.token = token;
  }

  logout() {
    this.user = null;
    this.token = null;
  }

  getToken() {
    if(!this.token) throw new Error('Unauthenticated');
    return `Bearer ${this.token}`;
  }

}

export default new User();