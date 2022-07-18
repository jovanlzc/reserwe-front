import {EmployeeCategory} from '../model/employee-category.model';
import {User} from '../../auth/model/user.model';

export interface EmployeeState {
  selectedEmployeeCategory: EmployeeCategory;
  employeeCategories: EmployeeCategory[];
  employees: User[];
}

export const INIT_EMPLOYEE_STATE: EmployeeState = {
  selectedEmployeeCategory: null,
  employeeCategories: null,
  employees: null
};
