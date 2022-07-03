import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class AuthApi {
  readonly RESERWE_AUTH_API = `${environment.baseURI}/api/rs/reserwe/auth`;

  constructor(private http: HttpClient) {
  }

  login(username, password): Observable<any> {
    const url = `${this.RESERWE_AUTH_API}/login`;
    return this.http.post(url, {username, password});
  }
}
