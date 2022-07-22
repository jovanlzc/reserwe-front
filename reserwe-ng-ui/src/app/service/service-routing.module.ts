import {Route, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AddServiceCategoryComponent} from './components/service-category/add/add-service-category.component';
import {ListServiceCategoryComponent} from './components/service-category/list/list-service-category.component';
import {AddServiceComponent} from './components/service/add/add-service.component';
import {ListServiceComponent} from './components/service/list/list-service.component';

const routes: Route[] = [
  {path: 'category/add', component: AddServiceCategoryComponent},
  {path: 'category/list', component: ListServiceCategoryComponent},
  {path: 'add', component: AddServiceComponent},
  {path: 'list', component: ListServiceComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ServiceRoutingModule {
  constructor() {
  }
}
