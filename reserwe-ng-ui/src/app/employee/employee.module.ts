import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {AddEmployeeCategoryComponent} from './components/employee-category/add/add-employee-category.component';
import {EmployeeRoutingModule} from './employee-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AppCommonModule} from '../common/common.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {employeeReducers} from './store/reducers';
import {EmployeeEffects} from './store/effects';
import {ToastrModule} from 'ngx-toastr';
import {EmployeeApi} from './api/employee-api';
import {ListEmployeeCategoryComponent} from './components/employee-category/list/list-employee-category.component';
import {ListEmployeeComponent} from './components/employee/list/list-employee.component';
import {AddEmployeeComponent} from './components/employee/add/add-employee.component';

@NgModule({
  declarations: [
    AddEmployeeCategoryComponent,
    ListEmployeeCategoryComponent,
    ListEmployeeComponent,
    AddEmployeeComponent
  ],
  imports: [
    AppCommonModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    EmployeeRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatStepperModule,
    MatCheckboxModule,
    MatMenuModule,
    MatRadioModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatTabsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatTooltipModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,
      tapToDismiss: true,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'decreasing',
      preventDuplicates: true,
      enableHtml: true,
    }),
    StoreModule.forFeature('appEmployee', employeeReducers),
    EffectsModule.forFeature([EmployeeEffects]),
  ],
  exports: [AddEmployeeCategoryComponent],
  providers: [
    EmployeeApi,
    EmployeeEffects
  ]
})
export class EmployeeModule {

}
