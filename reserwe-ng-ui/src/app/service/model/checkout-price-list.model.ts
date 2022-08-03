import {Service} from './service.model';
import {EmployeeCategory} from '../../employee/model/employee-category.model';
import {User} from '../../auth/model/user.model';

export interface CheckoutPriceList {
  id?: string;
  amount: number;
  basicService?: Service;
  priceListId?: string;
  executorTypesExecutors?: Map<EmployeeCategory, User[]>;
}
