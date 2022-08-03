import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {ServiceState} from './state';

export const getSelectedServiceCategory = (state: ServiceState) => state.selectedServiceCategory;
export const getServiceCategories = (state: ServiceState) => state.serviceCategories;
export const getServices = (state: ServiceState) => state.services;
export const getPriceLists = (state: ServiceState) => state.priceLists;
export const getSelectedServices = (state: ServiceState) => state.selectedServices;
export const getCheckoutPricesLists = (state: ServiceState) => state.checkoutPriceLists;

export const selectServiceState: MemoizedSelector<object, ServiceState> = createFeatureSelector<ServiceState>('appService');

export const selectSelectedServiceCategory: MemoizedSelector<object, any> = createSelector(selectServiceState, getSelectedServiceCategory);
export const selectServiceCategories: MemoizedSelector<object, any> = createSelector(selectServiceState, getServiceCategories);
export const selectServices: MemoizedSelector<object, any> = createSelector(selectServiceState, getServices);
export const selectPriceLists: MemoizedSelector<object, any> = createSelector(selectServiceState, getPriceLists);
export const selectSelectedServices: MemoizedSelector<object, any> = createSelector(selectServiceState, getSelectedServices);
export const selectCheckoutPricesList: MemoizedSelector<object, any> = createSelector(selectServiceState, getCheckoutPricesLists);

