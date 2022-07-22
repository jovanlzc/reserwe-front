import {createReducer, on} from '@ngrx/store';
import {INIT_SERVICE_STATE, ServiceState} from './state';
import {
  addServiceCategorySuccess,
  searchPriceListsSuccess,
  searchServiceCategoriesSuccess,
  searchServicesSuccess,
  ServiceActions
} from './actions';

const reducer = createReducer(
  INIT_SERVICE_STATE,
  on(addServiceCategorySuccess, (state, {serviceCategory}) => ({
    ...state,
    selectedServiceCategory: serviceCategory,
  })),
  on(searchServiceCategoriesSuccess, (state, {searchResponse}) => ({
    ...state,
    serviceCategories: searchResponse,
  })),
  on(searchServicesSuccess, (state, {searchResponse}) => ({
    ...state,
    services: searchResponse,
  })),
  on(searchPriceListsSuccess, (state, {searchResponse}) => ({
    ...state,
    priceLists: searchResponse,
  })),
);

export function serviceReducers(state: ServiceState | undefined, action: ServiceActions): ServiceState {
  return reducer(state, action);
}
