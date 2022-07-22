import {Service} from './service.model';
import {EmployeeCategory} from '../../employee/model/employee-category.model';

export interface PriceList {
  id?: string;
  dateFrom: string;
  dateTo: string;
  amount: number;
  basicServiceId?: string;
  basicService?: Service;
  executorTypesIds?: string[];
  executorTypes?: EmployeeCategory[];
}
