import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {first, map} from 'rxjs/operators';
import {selectUserToken} from '../store/selectors';
import {AppState} from '../../root-store/state';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private store$: Store<AppState>,
              private navigator: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store$.select(selectUserToken).pipe(
      first(),
      map(token => {
        console.log('HomeGuard', token);
        if (!token) {
          console.log('HomeGuard navigira');
          return this.navigator.parseUrl('/login');
        }
        return true;
      })
    );
  }

}
