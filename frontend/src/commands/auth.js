import AuthService from '../services/auth';
import UserService from '../services/User';
export default {
  register: (commandArgs, print) => {
    const [, ...args] = commandArgs;
    AuthService.register({name: args[0], email: args[1], password: args[2]}).then(({ data }) => {
      console.log(data);
      UserService.login({ name: args[0] }, data.access_token );
      print(`$Welcome ${args[0]}!`);
    })
  },
  login: (commandArgs, print) => {
    const [, ...args] = commandArgs;
    AuthService.login({ email: args[0], password: args[1] }).then(({ data: { data } }) => {
      UserService.login(data.user , data.access_token );
      print(`$Welcome ${data.user.name}!`);
    })
  },
  whoami: (commandArgs, print) => {
    const user = UserService.user;
    if(!user) print("I don't know you, please login/register before");
    else print(user.name);
  }
}

export const authDescriptions = {
  register: 'register <name> <email> <password>',
  login: 'login <email> <password>',
  whoami: 'prints logged user\'s name',
}