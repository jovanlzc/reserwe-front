export interface WorkPlannerExecutorWrapper {
  workPlaners: WorkPlannerWrapper[];
  executorsIds?: string[];
  countRepeat: number;
}
export interface WorkPlannerWrapper {
  workPlannerData: WorkPlanner;
  name?: string;
  isActive?: boolean;
}

export interface WorkPlanner{
  startDate: string;
  endDate: string;
  timeRanges: TimeRange[];
}

export interface TimeRange {
  startTime: string;
  endTime: string;
}
