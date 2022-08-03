import {createAction, props, union} from '@ngrx/store';
import {EAppointmentActions} from '../constants/constants';
import {Appointment} from '../model/appointment.model';
import {SearchAppointment} from '../model/search-appointment.model';
import {CheckoutTimeRangesRequest} from '../model/checkout-time-ranges.request.model';
import {CheckoutTimeRangesModel} from '../model/checkout-time-ranges.model';

export const addAppointment = createAction(EAppointmentActions.ADD_APPOINTMENT, props<{ appointment: Appointment }>());
export const addAppointmentSuccess = createAction(EAppointmentActions.ADD_APPOINTMENT_SUCCESS, props<{ appointment: Appointment }>());

export const searchAppointments = createAction(EAppointmentActions.SEARCH_APPOINTMENTS, props<{ searchRequest: SearchAppointment }>());
export const searchAppointmentsSuccess = createAction(EAppointmentActions.SEARCH_APPOINTMENTS_SUCCESS, props<{ searchResponse: Appointment[] }>());

export const getTimeRanges = createAction(EAppointmentActions.GET_TIME_RANGES, props<{ getTimeRangesRequest: CheckoutTimeRangesRequest }>());
export const getTimeRangesSuccess = createAction(EAppointmentActions.GET_TIME_RANGES_SUCCESS, props<{ timeRanges: string[] }>());

const all = union({
  addAppointment,
  addAppointmentSuccess,
  searchAppointments,
  searchAppointmentsSuccess,
  getTimeRanges,
  getTimeRangesSuccess
});

export type AppointmentActions = typeof all;
