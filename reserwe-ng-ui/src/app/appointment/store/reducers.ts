import {createReducer, on} from '@ngrx/store';
import {AppointmentState, INIT_APPOINTMENT_STATE} from './state';
import {addAppointmentSuccess, AppointmentActions, getTimeRangesSuccess, searchAppointmentsSuccess} from './actions';

const reducer = createReducer(
  INIT_APPOINTMENT_STATE,
  on(addAppointmentSuccess, (state, {appointment}) => ({
    ...state,
    selectedAppointment: appointment,
  })),
  on(searchAppointmentsSuccess, (state, {searchResponse}) => ({
    ...state,
    appointments: searchResponse,
  })),
  on(getTimeRangesSuccess, (state, {timeRanges}) => ({
    ...state,
    timeRanges
  })),
);

export function appointmentReducers(state: AppointmentState | undefined, action: AppointmentActions): AppointmentState {
  return reducer(state, action);
}
