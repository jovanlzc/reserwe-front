import {ServiceCategory} from './service-category.model';

export interface Service {
  id?: string;
  basicPrice?: number;
  basicServiceCategoryId?: string;
  basicServiceCategory?: ServiceCategory;
  description?: string;
  duration?: number;
  name?: string;
  companyId?: string;
}
