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
