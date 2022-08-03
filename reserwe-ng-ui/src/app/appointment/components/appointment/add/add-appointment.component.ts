import {Component, OnInit} from '@angular/core';
import {Service} from '../../../../service/model/service.model';
import {ServiceCategory} from '../../../../service/model/service-category.model';
import {Store} from '@ngrx/store';
import * as ServiceActions from '../../../../service/store/actions';
import * as ServiceSelectors from '../../../../service/store/selectors';
import {SearchService} from '../../../../service/model/search-service.model';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  services: any;
  serviceCategory: ServiceCategory;
  checkedList: Service[] = [];

  constructor(private store$: Store) {
    const searchRequest: SearchService = {};
    this.store$.dispatch(ServiceActions.searchServices({searchRequest}));
  }

  ngOnInit(): void {
    this.initSelectors();
  }

  initSelectors(): void {
    this.store$.select(ServiceSelectors.selectServices).subscribe(services => {
      if (services) {
        this.services = this.groupByType(services);
      }
    });
  }

  groupByType(array): void {
    return array.reduce((r, a) => {
      r[a.basicServiceCategory.name] = r[a.basicServiceCategory.name] || [];
      r[a.basicServiceCategory.name].push(a);
      return r;
    }, Object.create(null));
  }

  checkEvent(event: { checked: boolean, service: Service }): void {
    if (event.checked) {
      if (this.checkedList.map(service => service.id).indexOf(event.service.id) <= -1) {
        this.checkedList.push(event.service);
      }
    } else {
      if (this.checkedList.map(service => service.id).indexOf(event.service.id) >= 0) {
        this.checkedList = this.checkedList.filter(service => service.id !== event.service.id);
      }
    }
    this.store$.dispatch(ServiceActions.setSelectedServices({services: this.checkedList}));
  }
}
