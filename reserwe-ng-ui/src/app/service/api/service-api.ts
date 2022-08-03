import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ServiceCategory} from '../model/service-category.model';
import {SearchServiceCategories} from '../model/search-service-categories.model';
import {Service} from '../model/service.model';
import {SearchService} from '../model/search-service.model';
import {SearchPriceList} from '../../employee/model/search-price-list.model';
import {PriceList} from '../model/price-list.model';
import {CheckoutPriceList} from "../model/checkout-price-list.model";

@Injectable()
export class ServiceApi {
  readonly RESERWE_SERVICE_API = `${environment.baseURI}/api/v1`;

  constructor(private http: HttpClient) {
  }

  addCategory(serviceCategory: ServiceCategory): Observable<any> {
    const url = `${this.RESERWE_SERVICE_API}/basic-service-category`;
    return this.http.post(url, {...serviceCategory, companyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'},
      {
        headers: {
          CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
        }
      }
    );
  }

  searchServiceCategories(searchRequest: SearchServiceCategories): Observable<any> {
    const url = `${this.RESERWE_SERVICE_API}/basic-service-category`;
    return this.http.get(url, {
      headers: {
        CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
      }
    });
  }

  addService(service: Service): Observable<any> {
    const url = `${this.RESERWE_SERVICE_API}/basic-service`;
    return this.http.post(url, {...service, companyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'},
      {
        headers: {
          CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
        }
      });
  }

  updateService(service: Service): Observable<any> {
    const url = `${this.RESERWE_SERVICE_API}/basic-service`;
    return this.http.put(url, {...service, companyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'},
      {
        headers: {
          CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
        }
      });
  }

  searchService(searchRequest: SearchService): Observable<any> {
    const url = `${this.RESERWE_SERVICE_API}/basic-service`;
    return this.http.get(url, {
      headers: {
        CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
      }
    });
  }

  addPriceList(priceList: PriceList): Observable<any> {
    const url = `${this.RESERWE_SERVICE_API}/price-list`;
    return this.http.post(url, {...priceList, companyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'},
      {
        headers: {
          CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
        }
      });
  }

  searchPriceList(searchRequest: SearchPriceList): Observable<any> {
    const url = `${this.RESERWE_SERVICE_API}/price-list/basic-service/${searchRequest.serviceId}`;
    return this.http.get<PriceList[]>(url, {
      headers: {
        CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
      }
    });
  }

  getPriceListsByServices(searchRequest: SearchPriceList): Observable<any> {
    const url = `${this.RESERWE_SERVICE_API}/price-list/basic-services`;
    return this.http.post(url, {...searchRequest, companyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'},
      {
        headers: {
          CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
        }
      });
  }
}
