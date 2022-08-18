import {Service} from './service.model';
import {EmployeeCategory} from '../../employee/model/employee-category.model';
import {EmployeeCategoryEmployeeModel} from '../../employee/model/employee-category-employee.model';

export interface CheckoutPriceList {
  id?: string;
  amount: number;
  basicService?: Service;
  priceListId?: string;
  executorTypesExecutors?: Map<EmployeeCategory, EmployeeCategoryEmployeeModel[]>;
}
