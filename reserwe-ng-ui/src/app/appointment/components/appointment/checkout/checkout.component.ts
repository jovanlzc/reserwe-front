import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as ServiceSelectors from '../../../../service/store/selectors';
import {CheckoutPriceList} from '../../../../service/model/checkout-price-list.model';
import {Service} from '../../../../service/model/service.model';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {KeyValuePipe} from '@angular/common';
import * as moment from 'moment';
import {CheckoutTimeRangesRequest} from '../../../model/checkout-time-ranges.request.model';
import {addAppointment, getTimeRanges} from '../../../store/actions';
import {selectTimeRanges} from '../../../store/selectors';
import {Appointment} from '../../../model/appointment.model';
import {ServiceExecutorModel} from '../../../model/service-executor.model';
import {User} from '../../../../auth/model/user.model';
import * as UsersSelectors from '../../../../employee/store/selectors';
import * as UsersActions from '../../../../employee/store/actions';
import {SearchUsersRequestModel} from "../../../../employee/model/search-users-request.model";
import {EmployeeCategory} from "../../../../employee/model/employee-category.model";
import {EmployeeCategoryEmployeeModel} from "../../../../employee/model/employee-category-employee.model";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [KeyValuePipe]
})
export class CheckoutComponent implements OnInit {
  selected: Date | null;
  checkoutPriceLists$: Observable<CheckoutPriceList[]>;
  checkoutPriceLists: CheckoutPriceList[];
  mapServicePriceLists: Map<Service, CheckoutPriceList[]> = new Map();
  indexes: Map<string, number> = new Map();
  form: FormGroup;
  formArrayIndex = -1;
  timeRanges$: Observable<string[]>;
  selectedTime: string;
  users$: Observable<User[]>;
  users: User[] = [];

  constructor(private store$: Store,
              private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef,
              private keyvalue: KeyValuePipe) {
    this.timeRanges$ = this.store$.select(selectTimeRanges);
    this.users$ = this.store$.select(UsersSelectors.getUsers);
    this.store$.select(UsersSelectors.selectUsers).subscribe(users => {
      if (users) {
        this.users = users;
        console.log('Users', users);
      }
    });
    this.checkoutPriceLists$ = this.store$.select(ServiceSelectors.selectCheckoutPricesList);
    this.store$.select(ServiceSelectors.selectCheckoutPricesList).subscribe(checkoutPriceLists => {
      if (checkoutPriceLists) {
        checkoutPriceLists.forEach(checkoutPriceList => {
          const foundedService = [...this.mapServicePriceLists.keys()].find(key => key.id === checkoutPriceList.basicService.id);
          if (!foundedService) {
            this.indexes.set(checkoutPriceList.basicService.id, 0);
            this.mapServicePriceLists.set(checkoutPriceList.basicService, [checkoutPriceList]);
          } else {
            this.mapServicePriceLists.get(foundedService).push({...checkoutPriceList});
          }
        });
        this.mapServicePriceLists.forEach((value, key) => {
          const formArray: FormArray = this.formBuilder.array([]);
          value.forEach(checkoutPriceList => {
            formArray.push(this.formBuilder.control(''));
          });
          (this.form.controls.formArray as FormArray).push(formArray);
        });
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    const searchRequest: SearchUsersRequestModel = {};
    this.store$.dispatch(UsersActions.searchUsers({searchRequest}));

    this.form.valueChanges.subscribe(value => {
      console.log('Forma', this.form.value);
      let allArrayFieldsPopulated = false;
      const users = [];
      value.formArray.forEach(array => {
        console.log('Array', array);
        array.forEach(arrayValue => {
          if (arrayValue !== '') {
            users.push(arrayValue);
            allArrayFieldsPopulated = true;
          }
        });
      });
      if (value.date && allArrayFieldsPopulated) {
        console.log('pripremiti request date', moment(value.date).format('dd-MM-yyyy'));
        console.log('pripremiti request users', users);
        let duration = 0;
        this.mapServicePriceLists.forEach((value1, key) => {
          duration += key.duration;
        });
        console.log('duration', duration);
        const checkoutTimeRangesRequest: CheckoutTimeRangesRequest = {
          employees: users,
          duration,
          date: moment(value.date).format('yyyy-MM-DD'),
          companyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
        };
        console.log('request', checkoutTimeRangesRequest);
        this.store$.dispatch(getTimeRanges({getTimeRangesRequest: checkoutTimeRangesRequest}));
      }
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group(
      {
        formArray: this.formBuilder.array([]),
        date: ['', Validators.required],
        user: ''
      }
    );
  }

  getEmployee(service: Service): any {
    const users: Map<string, any> = new Map(Object.entries(this.mapServicePriceLists.get(service)[this.indexes.get(service.id)].executorTypesExecutors));
    console.log('Mapa', users);
    // this.indexes.set(service.id, this.indexes.get(service.id) + 1 < this.mapServicePriceLists.get(service).length ? this.indexes.get(service.id) + 1 : 0);
    return users;
  }

  getIndex(i, j): AbstractControl {
    if (this.form && this.form.controls.formArray && (this.form.controls.formArray as FormArray).controls[i]) {
      return ((this.form.controls.formArray as FormArray).controls[i] as FormArray).controls[j];
    } else {
      return this.formBuilder.control('');
    }
  }

  nextEmployee(service: Service): void {
    console.log('Index Before:', this.indexes.get(service.id));
    this.indexes.set(service.id, this.indexes.get(service.id) + 1 < this.mapServicePriceLists.get(service).length ? this.indexes.get(service.id) + 1 : 0);
    console.log('Index After:', this.indexes.get(service.id));
    console.log('Mapa', this.mapServicePriceLists);
    this.changeDetectorRef.detectChanges();
  }

  extractNameFromJson(employeeCategory: string) {
    const employeeCategoryObject = JSON.parse(employeeCategory);
    return employeeCategoryObject.name;
  }

  updateFormDate(value: any) {
    this.form.get('date').setValue(value);
  }

  onTimeSelected(time: any) {
    console.log('Time', time);
    this.selectedTime = time;
  }


  save(): void {
    const appointment: Appointment = {};
    const serviceExecutors: ServiceExecutorModel[] = [];
    let duration = 0;
    let price = 0;
    this.mapServicePriceLists.forEach(((value, key) => {
        duration += key.duration;
        const priceList: CheckoutPriceList = value[this.indexes.get(key.id)];
        price += priceList.amount;
        const executorTypeExecutorsMap: Map<string, any> = new Map(Object.entries(priceList.executorTypesExecutors));
        console.log('EtE', executorTypeExecutorsMap);
        const executorTypeExecutorsIds: string[] = Array.from(executorTypeExecutorsMap.values()).flatMap(executorTypeExecutors => executorTypeExecutors).map(executorTypeExecutor => executorTypeExecutor.id);
        const serviceExecutor: ServiceExecutorModel = {
          companyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a',
          executorTypeExecutorsIds,
          dateTime: moment(this.form.get('date').value).format('yyyy-MM-DD') + ' ' + this.selectedTime,
          priceListId: priceList.priceListId
        };
        serviceExecutors.push(serviceExecutor);
      }
    ));
    appointment.serviceExecutors = serviceExecutors;
    appointment.duration = duration;
    appointment.dateAndTime = moment(this.form.get('date').value).format('yyyy-MM-DD') + ' ' + this.selectedTime;
    appointment.reservationPrice = price;
    appointment.companyId = 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a';
    appointment.userProfileId = this.form.controls.user.value;
    this.store$.dispatch(addAppointment({appointment}));
    // proveriti da li se vraca executorTypeExecutor ili cista mapa
  }
}
