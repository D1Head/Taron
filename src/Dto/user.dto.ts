import { IUser } from '../models/User';

export default class Dtos {
  static userDTO = (data: IUser) => {
    let user = data.toJSON();
    delete user.password;
    return {
      ...user,
    };
  };
}
