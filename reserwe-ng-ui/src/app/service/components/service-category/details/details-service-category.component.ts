import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-details-service-category',
  templateUrl: './details-service-category.component.html',
  styleUrls: ['./details-service-category.component.scss']
})
export class DetailsServiceCategoryComponent implements OnInit {
  @Input() name: string;

  constructor() {
  }

  ngOnInit(): void {
  }
}
