import { Service } from 'typedi';
import { ISignup } from '../interfaces/Isignup';
import { UserModel, IUser } from '../models/User';
@Service()
export default class UserRepo {
  createUser = async (data: any): Promise<IUser> => {
    const new_user = await new UserModel(data).save();
    return new_user;
  };

  find = async (condition: ISignup): Promise<IUser> => {
    const user = await UserModel.findOne(condition);
    return user;
  };

  findUserByEmail = async (email: string): Promise<IUser> => {
    const user = await UserModel.findOne({ email });
    return user;
  };

  findUserbyId = async (id: string): Promise<IUser> => {
    const user = await UserModel.findById(id);
    return user;
  };
}

//550038
