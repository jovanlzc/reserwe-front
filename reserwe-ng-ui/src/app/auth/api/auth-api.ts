import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthApi {
  readonly RESERWE_AUTH_API = `${environment.baseURI}/api/v1`;

  constructor(private http: HttpClient) {
  }

  login(username, password, companyId: string): Observable<any> {
    const url = `${this.RESERWE_AUTH_API}/login`;
    return this.http.post(url, {username, password, companyId},
      {
        headers: {
          CompanyId:
          companyId
        }
      }
    )
      ;
  }
}
