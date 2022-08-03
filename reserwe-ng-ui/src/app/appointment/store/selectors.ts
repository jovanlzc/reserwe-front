import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {AppointmentState} from './state';

export const getSelectedAppointment = (state: AppointmentState) => state.selectedAppointment;
export const getAppointments = (state: AppointmentState) => state.appointments;
export const getTimeRanges = (state: AppointmentState) => state.timeRanges;

export const selectAppointmentState: MemoizedSelector<object, AppointmentState> = createFeatureSelector<AppointmentState>('appAppointment');

export const selectSelectedAppointment: MemoizedSelector<object, any> = createSelector(selectAppointmentState, getSelectedAppointment);
export const selectAppointments: MemoizedSelector<object, any> = createSelector(selectAppointmentState, getAppointments);
export const selectTimeRanges: MemoizedSelector<object, any> = createSelector(selectAppointmentState, getTimeRanges);
