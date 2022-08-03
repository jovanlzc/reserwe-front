import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'employee',
        loadChildren: () => import('../employee/employee.module').then(module => module.EmployeeModule),
      },
      {
        path: 'service',
        loadChildren: () => import('../service/service.module').then(module => module.ServiceModule),
      },
      {
        path: 'appointment',
        loadChildren: () => import('../appointment/appointment.module').then(module => module.AppointmentModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
