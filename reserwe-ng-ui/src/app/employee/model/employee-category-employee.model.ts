import {User} from '../../auth/model/user.model';

export interface EmployeeCategoryEmployeeModel {
  id?: string;
  executorTypeId?: string;
  executorId?: string;
  executor?: User;
  companyId?: string;
}
