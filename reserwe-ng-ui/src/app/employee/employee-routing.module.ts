import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddEmployeeCategoryComponent} from './components/employee-category/add/add-employee-category.component';
import {ListEmployeeCategoryComponent} from './components/employee-category/list/list-employee-category.component';
import {ListEmployeeComponent} from './components/employee/list/list-employee.component';
import {AddEmployeeComponent} from './components/employee/add/add-employee.component';

const routes: Routes = [
  {path: 'category/add', component: AddEmployeeCategoryComponent},
  {path: 'category/list', component: ListEmployeeCategoryComponent},
  {path: 'add', component: AddEmployeeComponent},
  {path: 'list', component: ListEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {

}
