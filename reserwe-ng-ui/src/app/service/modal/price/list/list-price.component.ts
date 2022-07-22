import {Component, Inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatTableDataSource} from '@angular/material/table';
import {PriceList} from '../../../model/price-list.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Service} from '../../../model/service.model';
import {searchPriceLists} from '../../../store/actions';
import {SearchPriceList} from '../../../../employee/model/search-price-list.model';
import {selectPriceLists} from '../../../store/selectors';

@Component({
  selector: 'app-list-price',
  templateUrl: './list-price.component.html',
  styleUrls: ['./list-price.component.scss']
})
export class ListPriceModalComponent implements OnInit {
  dataSource = new MatTableDataSource<PriceList>([]);
  title = 'service.price-list.list.title';
  displayedColumns: string[] = ['details', 'amount', 'date', 'service', 'employeeCategories', 'actions'];

  constructor(private store$: Store,
              @Inject(MAT_DIALOG_DATA)
              public data: { service: Service }) {
    if (this.data.service) {
      const searchRequest: SearchPriceList = {
        serviceId: this.data.service.id
      };
      this.store$.dispatch(searchPriceLists({searchRequest}));
    }
  }

  ngOnInit(): void {
    this.store$.select(selectPriceLists).subscribe(priceLists => {
      this.dataSource.connect().next(priceLists);
    });
  }

  editPriceList(priceList: PriceList): void {
    console.log('PriceList', priceList);
  }
}
