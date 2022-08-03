import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as AppointmentActions from './actions';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AppointmentApi} from '../api/appointment-api';
import {EAppointmentActions} from '../constants/constants';
import {SearchAppointment} from '../model/search-appointment.model';
import {CheckoutTimeRangesRequest} from "../model/checkout-time-ranges.request.model";

@Injectable()
export class AppointmentEffects {
  constructor(private actions$: Actions,
              private store$: Store,
              private appointmentApi: AppointmentApi,
              private navigator: Router,
              private notificationMessages: ToastrService) {
  }

  addAppointmentEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EAppointmentActions.ADD_APPOINTMENT),
    switchMap((props: { appointment }) => this.appointmentApi.addAppointment(props.appointment).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          this.navigator.navigate(['/appointment/list']);
          this.notificationMessages.success('Successfully added appointment!');
          return of(
            AppointmentActions.addAppointmentSuccess({appointment: data}),
          );
        }
      )
      ),
    )));

  searchAppointmentEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EAppointmentActions.SEARCH_APPOINTMENTS),
    switchMap((props: { searchRequest: SearchAppointment }) => this.appointmentApi.searchAppointment(props.searchRequest).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          return of(
            AppointmentActions.searchAppointmentsSuccess({searchResponse: data}),
          );
        }
      )
      ),
    )));

  getCheckoutTimeRangesEffect = createEffect(() => this.actions$.pipe(
    ofType(EAppointmentActions.GET_TIME_RANGES),
    switchMap((props: { getTimeRangesRequest: CheckoutTimeRangesRequest }) => this.appointmentApi.getTimeRanges(props.getTimeRangesRequest).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          return of(
            AppointmentActions.getTimeRangesSuccess({timeRanges: data.timeRanges}),
          );
        }
      )
      ),
    )));

}
