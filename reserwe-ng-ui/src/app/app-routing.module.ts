import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/components/home/home.component';
import {LoginComponent} from './auth/components/login/login.component';
import {AuthGuard} from './auth/guards/auth-guard';
import {HomeGuard} from './auth/guards/home.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(module => module.HomeModule),
    canActivate: [HomeGuard],
  },
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
