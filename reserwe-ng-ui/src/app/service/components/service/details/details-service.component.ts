import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Service} from '../../../model/service.model';

@Component({
  selector: 'app-details-service',
  templateUrl: './details-service.component.html',
  styleUrls: ['./details-service.component.scss']
})
export class DetailsServiceComponent implements OnInit {
  @Input() service: Service;
  @Input() disableChecked: boolean;

  checked = false;
  @Output() checkedEvent: EventEmitter<{ checked: boolean; service: Service }> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  serviceCheck(): void {
    console.log('ServiceCheck', !this.checked);
    this.checked = !this.checked;
    this.checkedEvent.emit({
      checked: this.checked,
      service: this.service
    });
  }
}
