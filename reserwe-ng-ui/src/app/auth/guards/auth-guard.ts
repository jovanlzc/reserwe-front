import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectUserToken} from '../store/selectors';
import {first, map} from 'rxjs/operators';
import {AppState} from '../../root-store/state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store$: Store<AppState>,
              private navigator: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    this.store$.select(selectUserToken).subscribe(token => {
      console.log('SubscribeAuthGuard', token);
    });
    return this.store$.select(selectUserToken).pipe(
      first(),
      map(token => {
        console.log('TokenAuthGuard', token);
        if (token) {
          this.navigator.navigate(['/']);
        }
        return !token;
      }));
  }

}
