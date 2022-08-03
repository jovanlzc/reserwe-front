import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Appointment} from '../model/appointment.model';
import {SearchAppointment} from '../model/search-appointment.model';
import {CheckoutTimeRangesRequest} from "../model/checkout-time-ranges.request.model";

@Injectable()
export class AppointmentApi {
  readonly RESERWE_APPOINTMENT_API = `${environment.baseURI}/api/v1`;

  constructor(private http: HttpClient) {
  }

  addAppointment(appointment: Appointment): Observable<any> {
    const url = `${this.RESERWE_APPOINTMENT_API}/reservation`;
    return this.http.post(url, {...appointment, companyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'},
      {
        headers: {
          CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
        }
      }
    );
  }

  searchAppointment(searchRequest: SearchAppointment): Observable<any> {
    const url = `${this.RESERWE_APPOINTMENT_API}/reservation`;
    return this.http.get(url, {
      headers: {
        CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
      }
    });
  }

  getTimeRanges(checkoutTimeRangesRequest: CheckoutTimeRangesRequest): Observable<any> {
    const url = `${this.RESERWE_APPOINTMENT_API}/reservation/time-ranges`;
    return this.http.post(url, {...checkoutTimeRangesRequest, companyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'},
      {
        headers: {
          CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
        }
      }
    );

  }

}
