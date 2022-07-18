import {User} from '../../auth/model/user.model';

export interface Employee {
  user: User;
  employeeCategoriesIds: string[];
}
