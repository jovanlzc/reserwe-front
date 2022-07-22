import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {EServiceActions} from '../constants/constants';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ServiceApi} from '../api/service-api';
import * as ServiceActions from './actions';
import {SearchServiceCategories} from '../model/search-service-categories.model';
import {SearchService} from '../model/search-service.model';
import {SearchPriceList} from "../../employee/model/search-price-list.model";

@Injectable()
export class ServiceEffects {
  constructor(private actions$: Actions,
              private store$: Store,
              private serviceApi: ServiceApi,
              private navigator: Router,
              private notificationMessages: ToastrService) {
  }

  addServiceCategoryEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EServiceActions.ADD_SERVICE_CATEGORY),
    switchMap((props: { serviceCategory }) => this.serviceApi.addCategory(props.serviceCategory).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          this.navigator.navigate(['/service/category/list']);
          this.notificationMessages.success('Successfully added service category!');
          return of(
            ServiceActions.addServiceCategorySuccess({serviceCategory: data}),
          );
        }
      )
      ),
    )));

  searchServiceCategoryEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EServiceActions.SEARCH_SERVICE_CATEGORIES),
    switchMap((props: { searchRequest: SearchServiceCategories }) => this.serviceApi.searchServiceCategories(props.searchRequest).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          return of(
            ServiceActions.searchServiceCategoriesSuccess({searchResponse: data}),
          );
        }
      )
      ),
    )));

  addServiceEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EServiceActions.ADD_SERVICE),
    switchMap((props: { service }) => this.serviceApi.addService(props.service).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          this.navigator.navigate(['/service/list']);
          this.notificationMessages.success('Successfully added service!');
          return of(
            ServiceActions.addServiceSuccess({service: data}),
          );
        }
      )
      ),
    )));

  updateServiceEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EServiceActions.UPDATE_SERVICE),
    switchMap((props: { service }) => this.serviceApi.updateService(props.service).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          this.navigator.navigate(['/employee/list']);
          this.notificationMessages.success('Successfully updated service!');
          return of(
            ServiceActions.updateServiceSuccess({service: data}),
          );
        }
      )
      ),
    )));

  searchServicesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EServiceActions.SEARCH_SERVICE),
    switchMap((props: { searchRequest: SearchService }) => this.serviceApi.searchService(props.searchRequest).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          return of(
            ServiceActions.searchServicesSuccess({searchResponse: data}),
          );
        }
      )
      ),
    )));

  addPriceListEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EServiceActions.ADD_PRICE_LIST),
    switchMap((props: { priceList }) => this.serviceApi.addPriceList(props.priceList).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          this.notificationMessages.success('Successfully added service!');
          const searchRequest: SearchPriceList = {
            serviceId: data.priceList.basicServiceId
          };
          return of(
            ServiceActions.searchPriceLists({searchRequest}),
            ServiceActions.addServiceSuccess({service: data}),
          )
            ;
        }
      )
      ),
    )));

  searchPriceListEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EServiceActions.SEARCH_PRICE_LIST),
    switchMap((props: { searchRequest: SearchPriceList }) => this.serviceApi.searchPriceList(props.searchRequest).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          return of(
            ServiceActions.searchPriceListsSuccess({searchResponse: data}),
          );
        }
      )
      ),
    )));

}
