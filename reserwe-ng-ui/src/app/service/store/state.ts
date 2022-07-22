import {ServiceCategory} from '../model/service-category.model';
import {Service} from '../model/service.model';
import {PriceList} from "../model/price-list.model";

export interface ServiceState {
  selectedServiceCategory: ServiceCategory;
  selectedService: Service;
  serviceCategories: ServiceCategory[];
  services: Service[];
  priceLists: PriceList[];
}

export const INIT_SERVICE_STATE: ServiceState = {
  selectedServiceCategory: null,
  selectedService: null,
  serviceCategories: null,
  services: null,
  priceLists: null
};
