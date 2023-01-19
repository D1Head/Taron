import { Service } from 'typedi';
import LogsRepo from '../dbservices/user.table';

@Service()
export default class LogService {
  /**
   *
   */
  constructor(private readonly logRepo: LogsRepo) {}
  createLogs = async (data: any) => {
    return {};
  };

  updateLogs = async (id: string, data: any) => {
    return {};
  };

  getLogs = async () => {
    return {};
  };

  getLogsById = async (id: string) => {
    return {};
  };
}
