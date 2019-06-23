import AuthService from '../services/auth';
import UserService from '../services/User';
import User from '../services/User';
export default {
  register: (commandArgs, print) => {
    const [, ...args] = commandArgs;
    AuthService.register({name: args[0], email: args[1], password: args[2]}).then((result) => {
      UserService.login({ name: args[0] }, result.data.access_token );
      print(`$Welcome ${args[0]}!`);
    })
  },
  login: (commandArgs, print) => {
    const [, ...args] = commandArgs;
    console.log(args);
    AuthService.login({ email: args[0], password: args[1] }).then(({ data }) => {
      UserService.login(data.user , data.access_token );
      print(`$Welcome ${data.user.name}!`);
    })
  },
}