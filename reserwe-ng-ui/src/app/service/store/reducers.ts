import {createReducer, on} from '@ngrx/store';
import {INIT_SERVICE_STATE, ServiceState} from './state';
import {
  addServiceCategorySuccess, getPriceListsByServicesSuccess, searchPriceLists,
  searchPriceListsSuccess,
  searchServiceCategoriesSuccess,
  searchServicesSuccess,
  ServiceActions, setSelectedServices
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
  on(setSelectedServices, (state, {services}) => ({
    ...state,
    selectedServices: services,
  })),
  on(getPriceListsByServicesSuccess, (state, {searchResponse}) => ({
    ...state,
    checkoutPriceLists: searchResponse
  })),
);

export function serviceReducers(state: ServiceState | undefined, action: ServiceActions): ServiceState {
  return reducer(state, action);
}
