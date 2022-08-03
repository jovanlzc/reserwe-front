import {createAction, props, union} from '@ngrx/store';
import {EServiceActions} from '../constants/constants';
import {ServiceCategory} from '../model/service-category.model';
import {SearchServiceCategories} from '../model/search-service-categories.model';
import {Service} from '../model/service.model';
import {SearchService} from '../model/search-service.model';
import {SearchPriceList} from '../../employee/model/search-price-list.model';
import {PriceList} from '../model/price-list.model';
import {CheckoutPriceList} from "../model/checkout-price-list.model";

export const addServiceCategory = createAction(EServiceActions.ADD_SERVICE_CATEGORY, props<{ serviceCategory: ServiceCategory }>());
export const addServiceCategorySuccess = createAction(EServiceActions.ADD_SERVICE_CATEGORY_SUCCESS, props<{ serviceCategory: ServiceCategory }>());

export const searchServiceCategories = createAction(EServiceActions.SEARCH_SERVICE_CATEGORIES, props<{ searchRequest: SearchServiceCategories }>());
export const searchServiceCategoriesSuccess = createAction(EServiceActions.SEARCH_SERVICE_CATEGORIES_SUCCESS, props<{ searchResponse: ServiceCategory[] }>());

export const searchServices = createAction(EServiceActions.SEARCH_SERVICE, props<{ searchRequest: SearchService }>());
export const searchServicesSuccess = createAction(EServiceActions.SEARCH_SERVICE_SUCCESS, props<{ searchResponse: Service[] }>());

export const addService = createAction(EServiceActions.ADD_SERVICE, props<{ service: Service }>());
export const addServiceSuccess = createAction(EServiceActions.ADD_SERVICE_SUCCESS, props<{ service: Service }>());

export const updateService = createAction(EServiceActions.UPDATE_SERVICE, props<{ service: Service }>());
export const updateServiceSuccess = createAction(EServiceActions.UPDATE_SERVICE_SUCCESS, props<{ service: Service }>());

export const addPriceList = createAction(EServiceActions.ADD_PRICE_LIST, props<{ priceList: PriceList }>());
export const addPriceListSuccess = createAction(EServiceActions.ADD_PRICE_LIST_SUCCESS, props<{ priceList: PriceList }>());

export const searchPriceLists = createAction(EServiceActions.SEARCH_PRICE_LIST, props<{ searchRequest: SearchPriceList }>());
export const searchPriceListsSuccess = createAction(EServiceActions.SEARCH_PRICE_LIST_SUCCESS, props<{ searchResponse: PriceList[] }>());

export const getPriceListsByServices = createAction(EServiceActions.GET_PRICE_LIST_BY_SERVICE, props<{ searchRequest: SearchPriceList}>());
export const getPriceListsByServicesSuccess = createAction(EServiceActions.GET_PRICE_LIST_BY_SERVICE_SUCCESS, props<{ searchResponse: CheckoutPriceList[]}>());

export const setSelectedServices = createAction(EServiceActions.SET_SELECTED_SERVICES, props<{ services: Service[] }>());

const all = union({
  addServiceCategory,
  addServiceCategorySuccess,
  searchServiceCategories,
  searchServiceCategoriesSuccess,
  searchServices,
  searchServicesSuccess,
  addService,
  addServiceSuccess,
  updateService,
  updateServiceSuccess,
  addPriceList,
  addPriceListSuccess,
  searchPriceLists,
  searchPriceListsSuccess,
  getPriceListsByServices,
  getPriceListsByServicesSuccess,
  setSelectedServices
});

export type ServiceActions = typeof all;
