import {NgModule} from '@angular/core';
import {AppointmentRoutingModule} from './appointment-routing.module';
import {AppCommonModule} from '../common/common.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
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
import {ToastrModule} from 'ngx-toastr';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {appointmentReducers} from './store/reducers';
import {AppointmentEffects} from './store/effects';
import {ListAppointmentComponent} from './components/appointment/list/list-appointment.component';
import {AppointmentApi} from './api/appointment-api';
import {AddAppointmentComponent} from './components/appointment/add/add-appointment.component';
import {ServiceModule} from '../service/service.module';
import {DetailsAppointmentComponent} from './components/appointment/details/details-appointment.component';
import {CheckoutComponent} from './components/appointment/checkout/checkout.component';

@NgModule({
  declarations: [
    ListAppointmentComponent,
    AddAppointmentComponent,
    DetailsAppointmentComponent,
    CheckoutComponent
  ],
  imports: [
    AppointmentRoutingModule,
    AppCommonModule,
    ServiceModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
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
    StoreModule.forFeature('appAppointment', appointmentReducers),
    EffectsModule.forFeature([AppointmentEffects]),
  ],
  exports: [],
  providers: [AppointmentApi, AppointmentEffects]
})
export class AppointmentModule {

}
