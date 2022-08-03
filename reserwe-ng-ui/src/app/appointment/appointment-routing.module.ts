import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ListAppointmentComponent} from './components/appointment/list/list-appointment.component';
import {AddAppointmentComponent} from './components/appointment/add/add-appointment.component';
import {CheckoutComponent} from './components/appointment/checkout/checkout.component';

const routes: Route[] = [
  {path: 'add', component: AddAppointmentComponent},
  {path: 'list', component: ListAppointmentComponent},
  {path: 'checkout', component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule {

}
