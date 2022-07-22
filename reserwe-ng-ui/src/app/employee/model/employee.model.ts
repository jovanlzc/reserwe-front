import {User} from '../../auth/model/user.model';
import {EmployeeCategory} from './employee-category.model';

export interface Employee {
  user: User;
  employeeCategoriesIds?: string[];
  employeeCategories?: EmployeeCategory[];
  uuid?: string;
}
