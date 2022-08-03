import {Appointment} from '../model/appointment.model';

export interface AppointmentState {
  selectedAppointment: Appointment;
  appointments: Appointment[];
  timeRanges: string[];
}

export const INIT_APPOINTMENT_STATE: AppointmentState = {
  selectedAppointment: null,
  appointments: [],
  timeRanges: []
};
