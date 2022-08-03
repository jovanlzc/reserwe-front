import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../model/employee.model';
import * as moment from 'moment';
import {TimeRange, WorkPlannerWrapper, WorkPlannerExecutorWrapper} from '../../model/work-planner.model';
import {Store} from '@ngrx/store';
import {addWorkPlanner} from '../../store/actions';

@Component({
  selector: 'app-employee-work-planner',
  templateUrl: './work-planner.modal.component.html',
  styleUrls: ['./work-planner.modal.component.scss']
})
export class WorkPlannerModalComponent implements OnInit {
  form: FormGroup;
  workPlanner: WorkPlannerWrapper[] = [];

  constructor(private formBuilder: FormBuilder,
              private store$: Store,
              @Inject(MAT_DIALOG_DATA)
              public data: { employee: Employee },
              private dialogRef: MatDialogRef<WorkPlannerModalComponent>) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dateTimeArray: this.formBuilder.array(
        [this.formBuilder.group({
          workPlannerTimes: this.formBuilder.array([
            this.formBuilder.group({
              workPlannerStartTime: ['', Validators.required],
              workPlannerEndTime: ['', Validators.required]
            })
          ]),
          workPlannerStartDate: ['', Validators.required],
          workPlannerEndDate: ['', Validators.required]
        })]
      ),
      countRepeat: ['']
    });
    console.log('Form', this.form);
  }

  clearDate(event): void {
    console.log('event', event);
  }

  addWorkPlannerTime(index: number) {
    const workPlannerControl: FormGroup = (this.form.controls.dateTimeArray as FormArray).at(index) as FormGroup;
    (workPlannerControl.get('workPlannerTimes') as FormArray).push(this.formBuilder.group({
      workPlannerTime: ['', Validators.required]
    }));
  }

  addWorkPlannerRow() {
    (this.form.controls.dateTimeArray as FormArray).push(this.formBuilder.group({
      workPlannerTimes: this.formBuilder.array([
        this.formBuilder.group({
          workPlannerStartTime: ['', Validators.required],
          workPlannerEndTime: ['', Validators.required]
        })
      ]),
      workPlannerStartDate: ['', Validators.required],
      workPlannerEndDate: ['', Validators.required]
    }));
  }

  changeEndDate(event, index): void {
    console.log('Menja se date', moment(event.target.value));
    const range: WorkPlannerWrapper = this.workPlanner[index] ? this.workPlanner[index] : {
      workPlannerData: {
        startDate: null,
        endDate: null,
        timeRanges: []
      }
    };
    if (event.target.value) {
      range.workPlannerData.endDate = moment(event.target.value).format('YYYY-MM-DD');
    }
    this.workPlanner[index] = range;
  }

  changeStartDate(event, index): void {
    console.log('Menja se date', moment(event.target.value));
    const range: WorkPlannerWrapper = this.workPlanner[index] ? this.workPlanner[index] : {
      workPlannerData: {
        startDate: null,
        endDate: null,
        timeRanges: []
      }
    };
    if (event.target.value) {
      range.workPlannerData.startDate = moment(event.target.value).format('YYYY-MM-DD');
    }
    this.workPlanner[index] = range;
  }

  changeEndTime(event: string, indexDate, indexTime): void {
    if (event.substring(0, event.indexOf(':')).length === 1) {
      event = '0' + event;
    }
    console.log('Menja se time', event);
    const range: WorkPlannerWrapper = this.workPlanner[indexDate] ? this.workPlanner[indexDate] : {
      workPlannerData: {
        startDate: null,
        endDate: null,
        timeRanges: []
      }
    };
    const timeRange: TimeRange = (this.workPlanner[indexDate] && this.workPlanner[indexDate].workPlannerData.timeRanges[indexTime]) ? this.workPlanner[indexDate].workPlannerData.timeRanges[indexTime] : {
      startTime: null,
      endTime: null
    } as TimeRange;
    if (event) {
      timeRange.endTime = event;
    }
    range.workPlannerData.timeRanges[indexTime] = timeRange;
    console.log('Range', range);
    this.workPlanner[indexDate] = range;
    console.log('WorkPlanner', this.workPlanner);
  }

  changeStartTime(event, indexDate, indexTime): void {
    if (event.substring(0, event.indexOf(':')).length === 1) {
      event = '0' + event;
    }
    console.log('Menja se time', event);
    const range: WorkPlannerWrapper = this.workPlanner[indexDate] ? this.workPlanner[indexDate] : {
      workPlannerData: {
        startDate: null,
        endDate: null,
        timeRanges: []
      }
    };
    const timeRange: TimeRange = (this.workPlanner[indexDate] && this.workPlanner[indexDate].workPlannerData.timeRanges[indexTime]) ? this.workPlanner[indexDate].workPlannerData.timeRanges[indexTime] : {
      startTime: null,
      endTime: null
    } as TimeRange;
    if (event) {
      timeRange.startTime = event;
    }
    range.workPlannerData.timeRanges[indexTime] = timeRange;
    this.workPlanner[indexDate] = range;
  }

  save(): void {
    const workPlannerWrapper: WorkPlannerExecutorWrapper = {
      workPlaners: this.workPlanner,
      executorsIds: [this.data.employee.user.id],
      countRepeat: this.form.value.countRepeat
    };
    console.log('WorkPlannerWrapper', workPlannerWrapper);
    this.store$.dispatch(addWorkPlanner({workPlanner: workPlannerWrapper}));
  }
}
