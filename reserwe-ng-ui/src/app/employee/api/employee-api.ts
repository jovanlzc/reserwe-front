import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {EmployeeCategory} from '../model/employee-category.model';
import {SearchEmployeeCategories} from '../model/search-employee-categories.model';
import {Employee} from '../model/employee.model';
import {SearchEmployeeRequest} from "../model/search-employee-request.model";

@Injectable()
export class EmployeeApi {
  readonly RESERWE_EMPLOYEE_API = `${environment.baseURI}/api/v1`;

  constructor(private http: HttpClient) {
  }

  addCategory(employeeCategory: EmployeeCategory): Observable<any> {
    const url = `${this.RESERWE_EMPLOYEE_API}/executor-type`;
    return this.http.post(url, {...employeeCategory, companyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'},
      {
        headers: {
          CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
        }
      }
    );
  }

  searchEmployeeCategories(searchRequest: SearchEmployeeCategories): Observable<any> {
    const url = `${this.RESERWE_EMPLOYEE_API}/executor-type`;
    return this.http.get(url, {
      headers: {
        CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
      }
    });
  }

  addEmployee(employee: Employee): Observable<any> {
    const url = `${this.RESERWE_EMPLOYEE_API}/executor-type-executor/addAll`;
    return this.http.post(url, {...employee, companyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'},
      {
        headers: {
          CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
        }
      });
  }

  searchEmployee(searchRequest: SearchEmployeeRequest): Observable<any> {
    const url = `${this.RESERWE_EMPLOYEE_API}/executor-type-executor/userProfiles`;
    return this.http.get(url, {
      headers: {
        CompanyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
      }
    });
  }
}
