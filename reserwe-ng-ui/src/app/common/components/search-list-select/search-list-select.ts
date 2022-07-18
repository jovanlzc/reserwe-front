import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import {MatSelect} from '@angular/material/select';
import {ReplaySubject, Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {AbstractControl, FormControl} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field';

@Component({
  selector: 'lib-search-list-select',
  templateUrl: './search-list-select.html',
  styleUrls: ['./search-list-select.scss']
})
export class SearchListSelectComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() form: AbstractControl;
  @Input() required: boolean;
  @Input() translatePrefix?: string;
  @Input() displayValue: string;
  @Input() disable: boolean;
  @Input() displayValue2?: string;
  @Input() placeholder: string;
  @Input() optionsComparator = 'id';
  @Input() comparator: string;
  @Input() comparator2: string;
  @Input() optionObjects: any[];
  @Input() isMultiple = false;
  @Input() label: string;
  @Input() customErrorName: string;
  @Input() customErrorMessage: string;

  // tslint:disable-next-line:variable-name
  disabledValues_: any[];

  @Input() set disabledValues(values: any[]) {
    this.disabledValues_ = values;
  }

  @Input() valueName: string;
  @Input() appearance: MatFormFieldAppearance;
  @Input() tooltipAttribute = '';
  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() openedChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() elementChange: EventEmitter<any> = new EventEmitter<any>();
  hasSelectValue = false;

  @ViewChild('selectSearch', {static: true}) selectSearch: MatSelect;
  public selectFilterCtrl: FormControl = new FormControl();
  public filtered$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.optionObjects) {
      this.optionObjects = this.optionObjects.slice().sort((a, b) => {
        return a[this.displayValue].substring(0, 1) > b[this.displayValue].substring(0, 1) ? 1 : -1;
      });
    }
    this.filterOptions();
  }

  ngAfterViewInit(): void {
    this.filtered$
      .pipe(take(1), takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (!this.valueName) {
          this.selectSearch.compareWith = (a, b) => a && b && a[this.optionsComparator] === b[this.optionsComparator];
        }
      });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.optionObjects) {
      this.optionObjects = this.optionObjects.slice().sort((a, b) => {
        return a[this.displayValue].substring(0, 1) > b[this.displayValue] ? 1 : -1;
      });
      this.filtered$.next(this.optionObjects);
    }
  }

  private filterOptions(): void {
    this.selectFilterCtrl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.filter();
      });
  }

  protected filter(): void {
    if (!this.optionObjects) {
      return;
    }
    // filter keyword in search field
    let search = this.selectFilterCtrl.value;
    if (!search) {
      this.filtered$.next(this.optionObjects.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter data
    this.filtered$.next(
      this.optionObjects
        .filter(a => a[this.comparator].toLowerCase().indexOf(search) > -1
          || this.comparator2 && a[this.comparator2].toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  emmitChange(value: any): void {
    this.hasSelectValue = true;
    if (this.isMultiple && value && value.length === 0) {
      this.form.patchValue(null);
      value = null;
      this.hasSelectValue = false;
    }
    this.selectionChange.emit(value);
  }

  emmitClick(value: any): void {
    this.clickEvent.emit(value);
  }

  clearSelected($event: MouseEvent): void {
    $event.stopPropagation();
    this.form.patchValue(null);
    this.hasSelectValue = false;
    this.selectionChange.emit();
  }

  emitOpenedChange(event: boolean): void {
    this.openedChange.emit(event);
  }

  onElementChange(event): void {
    this.elementChange.emit(event);
  }

}
