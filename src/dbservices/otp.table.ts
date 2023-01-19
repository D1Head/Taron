import { Service } from 'typedi';
import { OtpModel, IOtp } from '../models/Otp';
@Service()
export default class OtpRepo {
  create = async (data: Iotp): Promise<IOtp> => {
    const new_otp = await new OtpModel(data).save();
    return new_otp;
  };

  find = async (condition: Iotp): Promise<IOtp> => {
    const otp = await OtpModel.findOne(condition);
    return otp;
  };

  update = async (condition: Iotp, changes: Iotp): Promise<IOtp> => {
    const update = await OtpModel.findOneAndUpdate(condition, changes, {
      returnDocument: 'after',
    });
    return update;
  };
}

interface Iotp {
  _id?: string;
  email?: string;
  otp?: string;
}
//550038
