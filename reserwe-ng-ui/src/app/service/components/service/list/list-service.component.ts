import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatTableDataSource} from '@angular/material/table';
import * as ServiceActions from '../../../store/actions';
import {selectServices} from '../../../store/selectors';
import {SearchService} from '../../../model/search-service.model';
import {Service} from '../../../model/service.model';
import {MatDialog} from '@angular/material/dialog';
import {AddPriceModalComponent} from "../../../modal/price/add/add-price.component";
import {ListPriceModalComponent} from "../../../modal/price/list/list-price.component";

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.scss']
})
export class ListServiceComponent implements OnInit {
  dataSource = new MatTableDataSource<Service>([]);
  title = 'service.list.title';
  displayedColumns: string[] = ['details', 'name', 'duration', 'basicPrice', 'description', 'category', 'actions'];

  constructor(private store$: Store,
              private dialog: MatDialog) {
    const searchRequest: SearchService = {};
    this.store$.dispatch(ServiceActions.searchServices({searchRequest}));
  }

  ngOnInit(): void {
    this.setSelectors();
  }

  setSelectors(): void {
    this.store$.select(selectServices).subscribe(services => {
      if (services) {
        this.dataSource.connect().next(services);
      }
    });
  }

  editPriceLists(service: Service): void {
    this.dialog.open(ListPriceModalComponent, {
      width: '70%',
      height: '65%',
      data: {
        service
      }
    }).afterClosed().subscribe(x => {
      console.log(x);
    });
  }

  addPriceList(service: Service): void {
    console.log('Service', service);
    this.dialog.open(AddPriceModalComponent, {
      data: {
        service
      }
    }).afterClosed().subscribe(x => {
      console.log(x);
    });
  }
}
