import {ServiceExecutorModel} from './service-executor.model';

export interface Appointment {
  id?: string;
  dateAndTime?: string;
  reservationPrice?: number;
  duration?: number;
  userProfileId?: string;
  serviceExecutorsIds?: string[];
  serviceExecutors?: ServiceExecutorModel[];
  companyId?: string;
}
