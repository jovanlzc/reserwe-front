import {Component, Input, OnInit} from '@angular/core';
import {Service} from '../../../../service/model/service.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as ServiceActions from '../../../../service/store/actions';
import {SearchPriceList} from '../../../../employee/model/search-price-list.model';

@Component({
  selector: 'app-details-appointment',
  templateUrl: 'details-appointment.component.html',
  styleUrls: ['details-appointment.component.scss']
})
export class DetailsAppointmentComponent implements OnInit {
  @Input() checkedServices: Service[];

  constructor(private navigate: Router,
              private store$: Store) {
  }

  ngOnInit(): void {
  }

  save(): void {
    const searchRequest: SearchPriceList = {
      servicesIds: this.checkedServices.map(service => service.id)
    };
    this.store$.dispatch(ServiceActions.getPriceListsByServices({searchRequest}));
    this.navigate.navigate(['/appointment/checkout']);
  }
}
